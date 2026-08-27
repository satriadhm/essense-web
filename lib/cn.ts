import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to be told about the font sizes added in the @theme
 * block of globals.css. Without this it classifies `text-statement` as a text
 * *colour* (anything it doesn't recognise as a size falls through to colour),
 * so `text-statement` would not override `text-lg`, and would wrongly override
 * `text-[var(--accent-cyan)]`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "statement",
            "section",
            "subsection",
            "body",
            "small",
            "label",
          ],
        },
      ],
    },
  },
});

/**
 * Joins class names and resolves Tailwind conflicts, so a caller's override
 * actually wins. A plain join left both classes in the list and let stylesheet
 * order decide, which meant `<GlassCard className="rounded-none">` kept the
 * component's `rounded-2xl` as often as not.
 */
export function cn(...parts: (string | undefined | false | null)[]) {
  return twMerge(parts.filter(Boolean).join(" "));
}
