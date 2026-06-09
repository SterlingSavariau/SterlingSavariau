import type { ComponentProps } from "react";
import type { BlocksRenderer } from "@strapi/blocks-react-renderer";

type RendererProps = NonNullable<ComponentProps<typeof BlocksRenderer>["blocks"]>;
type ModifierProps = NonNullable<ComponentProps<typeof BlocksRenderer>["modifiers"]>;

const headingClasses: Record<number, string> = {
  1: "text-3xl font-bold text-foreground mt-8 mb-3",
  2: "text-2xl font-bold text-foreground mt-6 mb-2",
  3: "text-xl font-semibold text-foreground mt-5 mb-2",
  4: "text-lg font-semibold text-foreground mt-4 mb-1",
  5: "text-base font-semibold text-foreground mt-3 mb-1",
  6: "text-sm font-semibold text-foreground mt-2 mb-1",
};

export const strapiRenderers: RendererProps = {
  heading: ({ children, level }) => {
    const cls = headingClasses[level] ?? headingClasses[3];
    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return <Tag className={cls}>{children}</Tag>;
  },
  paragraph: ({ children }) => (
    <p className="text-muted-foreground leading-relaxed mb-3">{children}</p>
  ),
  list: ({ children, format }) =>
    format === "ordered" ? (
      <ol className="list-decimal ml-6 mb-3 space-y-1 text-muted-foreground">{children}</ol>
    ) : (
      <ul className="list-disc ml-6 mb-3 space-y-1 text-muted-foreground">{children}</ul>
    ),
  "list-item": ({ children }) => <li className="leading-relaxed">{children}</li>,
  quote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground mb-3">
      {children}
    </blockquote>
  ),
  code: ({ plainText }) => (
    <pre className="bg-muted rounded-lg p-4 overflow-x-auto mb-3">
      <code className="text-sm font-mono text-foreground">{plainText}</code>
    </pre>
  ),
  link: ({ children, url }) => (
    <a
      href={url}
      className="text-primary underline underline-offset-2 hover:opacity-70"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export const strapiModifiers: ModifierProps = {
  bold: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  italic: ({ children }) => <em className="italic">{children}</em>,
  underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
  strikethrough: ({ children }) => <s className="line-through">{children}</s>,
  code: ({ children }) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
      {children}
    </code>
  ),
};
