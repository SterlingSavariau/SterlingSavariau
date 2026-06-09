export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="section-divider" />
      <p className="section-label mb-5">{children}</p>
    </>
  );
}
