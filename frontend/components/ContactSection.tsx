import { ContactForm } from "./client/ContactForm";
import { EmailDisplay } from "./client/EmailDisplay";

function ChatBubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  if (side === "right") {
    return (
      <div className="flex justify-end mb-3">
        <div className="bg-[#007AFF] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[72%]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-3">
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function SocialButtons() {
  const buttons = [
    {
      label: "Book video call",
      href: "#",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 5.5l3-2v7l-3-2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "DM me on X",
      href: "https://x.com",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M9.5 1.5h1.8L7.7 5.6l4 4.9H8.3L5.7 7.1 2.7 10.5H.9l3.8-4.4L.8 1.5h3.4l2.4 3.1L9.5 1.5zm-.7 8.1h1L3.5 2.7H2.4l6.4 6.9z" />
        </svg>
      ),
    },
    {
      label: "Connect on LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <rect x="1" y="4.5" width="2.5" height="7.5" rx="0.5" />
          <circle cx="2.25" cy="2.25" r="1.25" />
          <path d="M5.5 4.5h2.4v1.1c.5-.8 1.4-1.2 2.2-1.2 1.7 0 2.4 1.2 2.4 2.8V12h-2.5V7.6c0-.7-.3-1.1-.9-1.1s-1.1.4-1.1 1.1V12H5.5V4.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2 mb-4">
      {buttons.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
        >
          <span className="text-muted-foreground">{icon}</span>
          {label}
        </a>
      ))}
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mb-16 max-w-[400px]">
      <ChatBubble side="right">you&apos;re def cracked or smth</ChatBubble>
      <ChatBubble side="right">how do i actually reach you?</ChatBubble>

      <ChatBubble side="left">
        haha appreciate it
        <br />
        <br />
        fastest way is to email me. keep it short, don&apos;t write me an
        essay.
      </ChatBubble>

      <EmailDisplay />

      <ChatBubble side="right">hmm too lazy to email tho</ChatBubble>

      <ChatBubble side="left">
        fair. just use the form below, lands in the same inbox, less work for
        you.
      </ChatBubble>

      <div className="mb-4">
        <ContactForm />
      </div>

      <ChatBubble side="right">awesome thanks</ChatBubble>
      <ChatBubble side="right">also where else are you online?</ChatBubble>

      <ChatBubble side="left">
        i mostly hang on X and LinkedIn. if you&apos;re building something fun,
        we can even hop on a quick call.
      </ChatBubble>

      <SocialButtons />

      <ChatBubble side="right">nice. i&apos;ll connect.</ChatBubble>

      <ChatBubble side="left">
        perfect. don&apos;t overthink it — just say hi. always down to chat,
        swap ideas, or hear what you&apos;re building.
        <br />
        <br />
        peace ;)
      </ChatBubble>
    </section>
  );
}
