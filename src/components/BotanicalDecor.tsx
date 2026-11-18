import React from 'react';

interface CornerFloralProps {
  position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  className?: string;
}

/**
 * Pure transparent-alpha luxury botanical white lily, ivory garden rose,
 * baby's breath, and antique-gold olive foliage SVG illustration.
 * Zero opaque background box — blends seamlessly onto any paper or wine surface.
 */
export const CornerFloral: React.FC<CornerFloralProps> = ({
  position,
  className = '',
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const lilyPetalId = `lilyPetal-${uid}`;
  const lilyThroatId = `lilyThroat-${uid}`;
  const roseOuterId = `roseOuter-${uid}`;
  const roseInnerId = `roseInner-${uid}`;
  const oliveLeafId = `oliveLeaf-${uid}`;
  const oliveLightId = `oliveLight-${uid}`;
  const shadowId = `botanicalShadow-${uid}`;

  const rotationClass =
    position === 'top-right'
      ? ''
      : position === 'bottom-left'
        ? 'rotate-180'
        : position === 'top-left'
          ? '-scale-x-100'
          : '-scale-y-100';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        className={`w-full h-full overflow-visible ${rotationClass}`}
      >
        <defs>
          <radialGradient id={lilyPetalId} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#FAF3E6" />
            <stop offset="100%" stopColor="#E6D7C1" />
          </radialGradient>

          <radialGradient id={lilyThroatId} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#C8BA8A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FAF3E6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={roseOuterId} cx="35%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="65%" stopColor="#F1E4CF" />
            <stop offset="100%" stopColor="#D7C2A3" />
          </radialGradient>

          <radialGradient id={roseInnerId} cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FBF4E7" />
            <stop offset="60%" stopColor="#E6D2B5" />
            <stop offset="100%" stopColor="#C4A67C" />
          </radialGradient>

          <linearGradient id={oliveLeafId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D5C4A7" />
            <stop offset="50%" stopColor="#B19B77" />
            <stop offset="100%" stopColor="#85704F" />
          </linearGradient>

          <linearGradient id={oliveLightId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4B08D" />
            <stop offset="100%" stopColor="#E3D5BD" />
          </linearGradient>

          <filter id={shadowId} x="-15%" y="-15%" width="135%" height="135%">
            <feDropShadow dx="-2" dy="4" stdDeviation="4" floodColor="#421923" floodOpacity="0.12" />
          </filter>
        </defs>

        <g filter={`url(#${shadowId})`}>
          {/* Delicate sweeping stems */}
          <g stroke="#8F7857" strokeWidth="1.4" strokeLinecap="round" opacity="0.82">
            <path d="M312 8 C242 22, 178 52, 114 96" />
            <path d="M312 8 C296 76, 268 144, 224 206" />
            <path d="M266 28 C218 22, 170 26, 132 42" />
            <path d="M286 58 C298 104, 294 152, 278 192" />
            <path d="M235 66 C192 88, 160 120, 134 156" />
          </g>

          {/* Olive / botanical foliage sprigs */}
          <g fill={`url(#${oliveLeafId})`} stroke="#7B6648" strokeWidth="0.6" strokeOpacity="0.5">
            {/* Upper horizontal branch leaves */}
            <path d="M132 42 C112 36, 98 26, 92 18 C108 18, 124 27, 132 42 Z" />
            <path d="M156 34 C140 20, 132 10, 128 2 C142 6, 152 18, 156 34 Z" />
            <path d="M174 30 C162 44, 148 52, 136 54 C144 40, 158 32, 174 30 Z" />
            <path d="M196 24 C186 10, 180 2, 180 -4 C192 2, 198 12, 196 24 Z" />

            {/* Mid diagonal leaves */}
            <path d="M114 96 C94 94, 78 86, 70 76 C88 74, 104 82, 114 96 Z" />
            <path d="M134 86 C116 74, 108 62, 104 52 C118 56, 130 68, 134 86 Z" />
            <path d="M148 112 C130 118, 114 116, 102 108 C118 102, 134 102, 148 112 Z" />

            {/* Lower vertical branch leaves */}
            <path d="M224 206 C214 224, 212 242, 216 254 C228 240, 232 222, 224 206 Z" />
            <path d="M244 186 C238 206, 240 224, 248 234 C256 218, 254 200, 244 186 Z" />
            <path d="M278 192 C282 212, 276 230, 266 240 C262 222, 266 204, 278 192 Z" />
            <path d="M292 158 C306 172, 310 190, 306 202 C294 190, 288 174, 292 158 Z" />
          </g>

          {/* Lighter translucent back leaves */}
          <g fill={`url(#${oliveLightId})`} opacity="0.88">
            <path d="M164 134 C144 142, 128 156, 120 170 C138 166, 154 152, 164 134 Z" />
            <path d="M188 148 C176 168, 172 188, 176 202 C188 186, 194 168, 188 148 Z" />
            <path d="M254 134 C272 146, 286 164, 290 178 C272 172, 258 154, 254 134 Z" />
          </g>

          {/* Baby's breath delicate white blossoms */}
          <g fill="#FFFDF9" stroke="#C5A46B" strokeWidth="0.55">
            {[
              [142, 66, 3.2], [152, 58, 2.5], [134, 76, 2.8],
              [162, 108, 3.4], [150, 118, 2.6], [174, 122, 2.4],
              [194, 164, 3.2], [204, 176, 2.6], [184, 178, 2.8],
              [262, 166, 3.2], [274, 158, 2.5], [254, 178, 2.6],
              [208, 36, 3.0], [198, 46, 2.4],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>

          {/* Secondary Lily Bud (top-left of bouquet) */}
          <g transform="translate(178, 52) rotate(-32)">
            <path
              d="M0 0 C-10 -14, -8 -36, 0 -46 C8 -36, 10 -14, 0 0 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#C5A46B"
              strokeWidth="0.7"
            />
            <path
              d="M0 0 C-4 -14, -2 -34, 0 -46"
              stroke="#B4A47A"
              strokeWidth="0.7"
              opacity="0.6"
            />
          </g>

          {/* Ivory Garden Rose #1 (near upper-right edge) */}
          <g transform="translate(268, 56)">
            <circle cx="0" cy="0" r="28" fill={`url(#${roseOuterId})`} stroke="#C8B18E" strokeWidth="0.6" />
            <path d="M-22 -8 C-14 -24, 14 -26, 24 -8 C18 8, -14 10, -22 -8 Z" fill={`url(#${roseOuterId})`} stroke="#C8B18E" strokeWidth="0.6" />
            <path d="M-20 8 C-24 -6, -12 -18, 4 -16 C18 -14, 24 2, 16 16 C4 24, -14 20, -20 8 Z" fill={`url(#${roseInnerId})`} stroke="#BFA47B" strokeWidth="0.6" />
            <path d="M-12 2 C-12 -10, 6 -14, 12 -4 C16 6, 4 14, -6 10 C-10 8, -12 5, -12 2 Z" fill={`url(#${roseOuterId})`} stroke="#BFA47B" strokeWidth="0.6" />
            <path d="M-6 -1 C-4 -8, 6 -7, 7 0 C7 6, -3 8, -6 -1 Z" fill="#D5B98E" opacity="0.85" />
          </g>

          {/* Hero White Trumpet Lily (blooming diagonally toward center) */}
          <g transform="translate(216, 104) rotate(-38)">
            {/* Back petals */}
            <path
              d="M0 4 C-22 -18, -32 -48, -14 -72 C2 -52, 14 -22, 0 4 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />
            <path
              d="M0 4 C22 -18, 32 -48, 14 -72 C-2 -52, -14 -22, 0 4 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />
            <path
              d="M0 6 C-26 2, -54 -14, -64 -34 C-42 -36, -16 -20, 0 6 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />
            <path
              d="M0 6 C26 2, 54 -14, 64 -34 C42 -36, 16 -20, 0 6 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />
            {/* Front cupped petals */}
            <path
              d="M0 8 C-16 -12, -18 -54, 0 -76 C18 -54, 16 -12, 0 8 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#C5A46B"
              strokeWidth="0.8"
            />
            <path
              d="M0 6 C-18 16, -42 18, -54 4 C-38 -8, -16 -6, 0 6 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />
            <path
              d="M0 6 C18 16, 42 18, 54 4 C38 -8, 16 -6, 0 6 Z"
              fill={`url(#${lilyPetalId})`}
              stroke="#CEBC9E"
              strokeWidth="0.75"
            />

            {/* Soft green-gold lily throat */}
            <circle cx="0" cy="-6" r="18" fill={`url(#${lilyThroatId})`} />

            {/* Delicate golden-bronze stamens */}
            <g stroke="#B8975C" strokeWidth="0.9" strokeLinecap="round">
              <path d="M0 2 Q-6 -18 -10 -32" />
              <path d="M0 2 Q-2 -22 -3 -36" />
              <path d="M0 2 Q4 -20 6 -34" />
              <path d="M0 2 Q10 -16 14 -28" />
            </g>
            <g fill="#9F7035">
              <ellipse cx="-10" cy="-33" rx="2.4" ry="1.2" transform="rotate(-25 -10 -33)" />
              <ellipse cx="-3" cy="-37" rx="2.4" ry="1.2" transform="rotate(-5 -3 -37)" />
              <ellipse cx="6" cy="-35" rx="2.4" ry="1.2" transform="rotate(15 6 -35)" />
              <ellipse cx="14" cy="-29" rx="2.4" ry="1.2" transform="rotate(30 14 -29)" />
            </g>
          </g>

          {/* Ivory Garden Rose #2 (tucked lower right of lily) */}
          <g transform="translate(264, 126) scale(0.86)">
            <circle cx="0" cy="0" r="24" fill={`url(#${roseOuterId})`} stroke="#C8B18E" strokeWidth="0.6" />
            <path d="M-18 -6 C-12 -20, 12 -22, 20 -6 C14 8, -12 8, -18 -6 Z" fill={`url(#${roseInnerId})`} stroke="#BFA47B" strokeWidth="0.6" />
            <path d="M-12 4 C-14 -8, 4 -14, 14 -4 C18 6, 6 16, -6 12 C-10 10, -12 7, -12 4 Z" fill={`url(#${roseOuterId})`} stroke="#BFA47B" strokeWidth="0.6" />
            <circle cx="0" cy="1" r="5" fill="#D5B98E" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Pure transparent-alpha horizontal white lily & olive garland for the invitation header.
 */
export const GarlandFloral: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const garlandPetalId = `garlandPetal-${uid}`;
  const garlandLeafId = `garlandLeaf-${uid}`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex justify-center ${className}`}
    >
      <svg
        viewBox="0 0 420 110"
        fill="none"
        className="w-full max-w-[340px] sm:max-w-[400px] h-auto overflow-visible"
      >
        <defs>
          <radialGradient id={garlandPetalId} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FAF3E6" />
            <stop offset="100%" stopColor="#E4D4BC" />
          </radialGradient>
          <linearGradient id={garlandLeafId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCC9AA" />
            <stop offset="100%" stopColor="#9A835F" />
          </linearGradient>
        </defs>

      {/* Symmetrical sweeping olive branches */}
      <g stroke="#967E5A" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <path d="M210 62 C156 64, 98 60, 42 54" />
        <path d="M210 62 C264 64, 322 60, 378 54" />
      </g>

      {/* Left olive leaves */}
      <g fill={`url(#${garlandLeafId})`} opacity="0.9">
        <path d="M62 56 C46 50, 34 48, 22 52 C34 60, 48 62, 62 56 Z" />
        <path d="M92 59 C76 48, 62 42, 50 42 C60 54, 74 60, 92 59 Z" />
        <path d="M114 61 C100 72, 86 76, 72 76 C84 64, 98 58, 114 61 Z" />
        <path d="M144 62 C130 48, 118 42, 106 42 C116 54, 128 60, 144 62 Z" />
        <path d="M164 63 C152 76, 138 82, 126 82 C136 70, 148 62, 164 63 Z" />
      </g>

      {/* Right olive leaves */}
      <g fill={`url(#${garlandLeafId})`} opacity="0.9">
        <path d="M358 56 C374 50, 386 48, 398 52 C386 60, 372 62, 358 56 Z" />
        <path d="M328 59 C344 48, 358 42, 370 42 C360 54, 346 60, 328 59 Z" />
        <path d="M306 61 C320 72, 334 76, 348 76 C336 64, 322 58, 306 61 Z" />
        <path d="M276 62 C290 48, 302 42, 314 42 C304 54, 292 60, 276 62 Z" />
        <path d="M256 63 C268 76, 282 82, 294 82 C284 70, 272 62, 256 63 Z" />
      </g>

      {/* Side ivory rosebuds */}
      <g transform="translate(148, 56)" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.7">
        <circle cx="0" cy="0" r="11" />
        <path d="M-7 -2 C-4 -9, 6 -9, 8 -2 C6 5, -4 5, -7 -2 Z" fill="#EFE1CC" />
      </g>
      <g transform="translate(272, 56)" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.7">
        <circle cx="0" cy="0" r="11" />
        <path d="M-7 -2 C-4 -9, 6 -9, 8 -2 C6 5, -4 5, -7 -2 Z" fill="#EFE1CC" />
      </g>

      {/* Central Blooming White Lily */}
      <g transform="translate(210, 58)">
        <path d="M0 2 C-18 -10, -26 -30, -14 -44 C-2 -34, 8 -14, 0 2 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.75" />
        <path d="M0 2 C18 -10, 26 -30, 14 -44 C2 -34, -8 -14, 0 2 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.75" />
        <path d="M0 4 C-22 2, -40 -10, -44 -24 C-28 -24, -12 -12, 0 4 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.75" />
        <path d="M0 4 C22 2, 40 -10, 44 -24 C28 -24, 12 -12, 0 4 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.75" />
        <path d="M0 5 C-11 -10, -12 -36, 0 -50 C12 -36, 11 -10, 0 5 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.8" />
        <path d="M0 4 C-14 14, -30 16, -36 6 C-24 -2, -10 -2, 0 4 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.7" />
        <path d="M0 4 C14 14, 30 16, 36 6 C24 -2, 10 -2, 0 4 Z" fill={`url(#${garlandPetalId})`} stroke="#C5A46B" strokeWidth="0.7" />
        <g stroke="#B8975C" strokeWidth="0.8" strokeLinecap="round">
          <path d="M0 0 Q-5 -14 -7 -23" />
          <path d="M0 0 Q0 -16 0 -26" />
          <path d="M0 0 Q5 -14 7 -23" />
        </g>
        <g fill="#9F7035">
          <circle cx="-7" cy="-24" r="1.4" />
          <circle cx="0" cy="-27" r="1.4" />
          <circle cx="7" cy="-24" r="1.4" />
        </g>
      </g>
    </svg>
  </div>
  );
};
