import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";

export function CTASection() {
  return (
    <section
      id="cta"
      /* Centres the content now that the footer has moved out of this
         section and no longer fills the lower half. */
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[var(--bg-deep)] px-[max(5vw,40px)] py-24"
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-[10%] h-[60vw] max-h-[500px] w-[60vw] rounded-full bg-[rgba(123,92,240,0.25)] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[5%] h-[50vw] max-h-[420px] w-[50vw] rounded-full bg-[rgba(77,217,255,0.15)] blur-[120px]"
        aria-hidden
      />

      <p
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-extrabold text-[rgba(255,255,255,0.02)]"
        style={{ fontSize: "clamp(120px, 18vw, 240px)" }}
        aria-hidden
      >
        ESSENSE
      </p>

      <div className="relative z-[1] mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Decorative: the heading below already names the product. */}
        <Image
          src="/app_logo.png"
          alt=""
          width={128}
          height={128}
          sizes="128px"
          className="mb-10 h-24 w-24 select-none object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
        />

        <h2 className="font-heading text-h1 font-extrabold text-[var(--text-primary)]">
          Get <span className="gradient-text-brand">Essense</span>.
        </h2>
        <p className="mt-6 max-w-[400px] text-lg text-[var(--text-secondary)]">
          In private beta. Request an invite to try it.
        </p>

        {/* The section asked for an invite but offered no way to request one. */}
        <CtaButton className="mt-8" label="Request an invite" />

        <p className="mt-10 text-sm text-[var(--accent-cyan)]">#OwnYourEssence</p>
      </div>

      <div className="pointer-events-none absolute left-8 top-24 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-label text-[var(--text-muted)] backdrop-blur-md">
        Private beta · invite only
      </div>
    </section>
  );
}
