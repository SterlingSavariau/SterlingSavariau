export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-5">
      {children}
    </p>
  );
}
