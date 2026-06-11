"use client";

import { useEffect, useRef, useState } from "react";

export function NavbarScroll({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const prevScrolled = useRef(false);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const onScroll = () => {
      const isNowScrolled = window.scrollY > 10;

      if (isNowScrolled && !prevScrolled.current) {
        setScrolled(true);
        setEntered(false);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setEntered(true))
        );
      } else if (!isNowScrolled && prevScrolled.current) {
        setEntered(false);
        setTimeout(() => setScrolled(false), 220);
      }

      prevScrolled.current = isNowScrolled;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={[
          "w-full flex items-center justify-between py-8 border-b border-border",
          scrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm px-5"
            : "",
        ].join(" ")}
        style={
          scrolled
            ? {
                transform: entered ? "translateY(0)" : "translateY(-10px)",
                opacity: entered ? 1 : 0,
                transition: "transform 0.22s ease, opacity 0.22s ease",
              }
            : {}
        }
      >
        {children}
      </header>
      {scrolled && <div style={{ height: navHeight }} />}
    </>
  );
}
