"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to Strapi backend
    console.log({ name, email, message });
  };

  const inputClass =
    "w-full bg-transparent border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border/80 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
      <input
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="john@doe.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground hover:bg-muted/80 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
