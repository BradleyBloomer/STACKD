export function GeometricBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="stackd-hex-grid"
          width="120"
          height="104"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="60,2 116,28 116,76 60,102 4,76 4,28"
            fill="none"
            stroke="#3DB4D3"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stackd-hex-grid)" />
    </svg>
  );
}
