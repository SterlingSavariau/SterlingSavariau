"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { ArrowUpRight, Mail, Send, BookOpen, Newspaper, Globe } from "lucide-react";
import { handleContactAction } from "@/data/actions/contact-actions";
import { contactInitialState } from "@/components/types/contact";
import type { StrapiSocialLink } from "@/components/types/connect";

const ICON_MAP: Record<string, React.ReactNode> = {
  DISCORD_ICON:  <Send size={14} strokeWidth={1.5} />,
  TELEGRAM_ICON: <Send size={14} strokeWidth={1.5} />,
  MEDIUM_ICON:   <BookOpen size={14} strokeWidth={1.5} />,
  EMAIL_ICON:    <Mail size={14} strokeWidth={1.5} />,
  SUBSTACK_ICON: <Newspaper size={14} strokeWidth={1.5} />,
};

function socialIcon(icon: string | null, text: string): React.ReactNode {
  if (icon && ICON_MAP[icon]) return ICON_MAP[icon];
  const lower = text.toLowerCase();
  if (lower.includes("email") || lower.includes("mail")) return <Mail size={14} strokeWidth={1.5} />;
  if (lower.includes("discord") || lower.includes("telegram")) return <Send size={14} strokeWidth={1.5} />;
  if (lower.includes("medium"))   return <BookOpen size={14} strokeWidth={1.5} />;
  if (lower.includes("substack")) return <Newspaper size={14} strokeWidth={1.5} />;
  return <Globe size={14} strokeWidth={1.5} />;
}

function formatHandle(url: string): string {
  try {
    if (url.startsWith("mailto:")) return url.replace("mailto:", "");
    const { pathname } = new URL(url);
    const last = pathname.replace(/\/$/, "").split("/").filter(Boolean).pop() ?? "";
    return last || url;
  } catch {
    return url;
  }
}

const inputClass =
  "flex-1 bg-card border border-border rounded-md px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-muted-foreground/60 transition-colors duration-150";

export function ContactForm({ socials = [] }: { socials?: StrapiSocialLink[] }) {
  const [state, formAction, pending] = useActionState(handleContactAction, contactInitialState);
  const [reset, setReset] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  });

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const showSuccess = state.success && !reset;

  return (
    <>
      {showSuccess ? (
        <div className="mb-10">
          <p className="section-label mb-2">Message sent</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Thanks, I&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setReset(true)}
            className="text-xs font-mono text-muted-foreground/60 hover:text-foreground underline underline-offset-2 transition-colors duration-150"
          >
            Send another message
          </button>
        </div>
      ) : (
      <form ref={formRef} action={formAction} className="flex flex-col gap-3 mb-10">
        <div className="flex gap-3">
          <input type="text" name="name" placeholder="John Doe" required className={inputClass} />
          <input type="email" name="email" placeholder="john@doe.com" required className={inputClass} />
        </div>
        {state.zodErrors?.name && (
          <p className="text-xs text-red-500 -mt-1">{state.zodErrors.name[0]}</p>
        )}
        {state.zodErrors?.email && (
          <p className="text-xs text-red-500 -mt-1">{state.zodErrors.email[0]}</p>
        )}

        <textarea
          ref={textareaRef}
          name="message"
          placeholder="Enter your message"
          onKeyDown={handleKeyDown}
          required
          rows={6}
          className="bg-card border border-border rounded-md px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-muted-foreground/60 transition-colors duration-150 resize-none overflow-hidden"
        />
        {state.zodErrors?.message && (
          <p className="text-xs text-red-500 -mt-1">{state.zodErrors.message[0]}</p>
        )}
        {state.message && !state.success && (
          <p className="text-xs text-red-500">{state.message}</p>
        )}

        <div className="flex items-center justify-between mt-1">
          <button
            type="submit"
            disabled={pending}
            className="bg-foreground text-background text-xs font-mono tracking-[0.1em] uppercase px-5 py-2.5 rounded-md hover:opacity-80 transition-opacity duration-150 disabled:opacity-40"
          >
            {pending ? "Sending..." : "Send message"}
          </button>
          <span className="text-[11px] font-mono text-muted-foreground/50 tracking-widest">
            or &nbsp; ⌘ ↵ to send
          </span>
        </div>
      </form>
      )}

      <div className="flex flex-col">
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.Url}
            target={s.isExternal ? "_blank" : undefined}
            rel={s.isExternal ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between py-3 border-b border-border last:border-0 transition-colors duration-150"
          >
            <span className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-150">
              <span className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-150">
                {socialIcon(s.Icon, s.Text)}
              </span>
              {s.Text}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-150">
              {formatHandle(s.Url)}
              <ArrowUpRight size={11} strokeWidth={1.5} />
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
