"use client";

const auraColors: Record<"top" | "mid" | "base", string> = {
  top: "#4DD9FF",
  mid: "#9D6FF5",
  base: "#F43F5E",
};

type NoteOrbProps = {
  noteType: "top" | "mid" | "base";
  size?: number;
};

export function NoteOrb({ noteType, size = 48 }: NoteOrbProps) {
  const color = auraColors[noteType];
  const id = `aura-grad-${noteType}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="40%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill={`url(#${id})`} />
    </svg>
  );
}
