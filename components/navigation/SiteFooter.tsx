/**
 * Page footer. This previously lived inside the CTA <section>, which nested the
 * contentinfo landmark inside <main> instead of making it a sibling of it.
 *
 * There is deliberately no "Privacy · Terms · Contact" row: it was plain text
 * styled to read as a link row, and there are no pages behind it yet. Add it
 * back as real links once those routes exist.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[var(--bg-deep)] px-[max(5vw,40px)] pb-10">
      <div className="mx-auto max-w-6xl border-t border-[var(--border-subtle)] pt-8 text-center text-xs text-[var(--text-muted)] md:text-left">
        © {new Date().getFullYear()} Essense. All rights reserved.
      </div>
    </footer>
  );
}
