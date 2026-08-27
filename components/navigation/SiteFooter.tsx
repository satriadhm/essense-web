/**
 * Page footer. This previously lived inside the CTA <section>, which nested the
 * contentinfo landmark inside <main> instead of making it a sibling of it.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[var(--bg-deep)] px-[max(5vw,40px)] pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] md:flex-row">
        <span>© {new Date().getFullYear()} Essense. All rights reserved.</span>
        <span>Privacy · Terms · Contact</span>
      </div>
    </footer>
  );
}
