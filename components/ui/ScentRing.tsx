"use client";

const RADII = [60, 90, 120, 150, 180];
const OPACITIES = [0.5, 0.3, 0.2, 0.12, 0.06];

export function ScentRing() {
  return (
    <div
      className="relative flex h-[min(70vw,420px)] w-[min(70vw,420px)] items-center justify-center"
      style={{
        animation: "scentBreath 4s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes scentBreath {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {RADII.map((r, i) => {
          const color =
            i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)";
          return (
            <g
              key={r}
              className={`scent-ring-layer scent-ring-layer--${i}`}
              transform="translate(200 200)"
            >
              <circle
                cx={0}
                cy={0}
                r={r}
                stroke={color}
                strokeOpacity={OPACITIES[i]}
                strokeWidth={1}
                fill="none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
