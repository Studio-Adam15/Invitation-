import React from 'react';

interface WaxSealProps {
  isOpening: boolean;
  onPress: () => void;
  ariaLabel: string;
}

const SHARDS = [
  { id: 'tl', clip: 'polygon(0% 0%, 52% 0%, 50% 50%, 0% 48%)', tx: '-58px', ty: '-52px', rot: '-28deg', delay: '40ms' },
  { id: 'tr', clip: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)', tx: '60px', ty: '-46px', rot: '32deg', delay: '60ms' },
  { id: 'ml', clip: 'polygon(0% 46%, 50% 50%, 44% 78%, 0% 82%)', tx: '-72px', ty: '14px', rot: '-42deg', delay: '80ms' },
  { id: 'mr', clip: 'polygon(50% 50%, 100% 48%, 100% 80%, 56% 78%)', tx: '72px', ty: '20px', rot: '38deg', delay: '70ms' },
  { id: 'bl', clip: 'polygon(0% 78%, 46% 75%, 50% 100%, 0% 100%)', tx: '-44px', ty: '66px', rot: '-22deg', delay: '95ms' },
  { id: 'br', clip: 'polygon(54% 75%, 100% 76%, 100% 100%, 48% 100%)', tx: '48px', ty: '70px', rot: '26deg', delay: '85ms' },
];

const BurgundySealSvg: React.FC<{ glowing?: boolean }> = ({ glowing }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full overflow-visible select-none"
    aria-hidden="true"
  >
    <defs>
      {/* Rich Burgundy & Dark Wine Wax */}
      <radialGradient id="burgundyWaxOuter" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#943B4E" />
        <stop offset="35%" stopColor="#672735" />
        <stop offset="72%" stopColor="#421923" />
        <stop offset="100%" stopColor="#2A0E15" />
      </radialGradient>

      <radialGradient id="burgundyWaxBed" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#5D212F" />
        <stop offset="60%" stopColor="#421923" />
        <stop offset="100%" stopColor="#2E1017" />
      </radialGradient>

      <linearGradient id="burgundyRimSheen" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#F1D5B8" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#672735" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#1F080D" stopOpacity="0.7" />
      </linearGradient>

      {/* Delicate Champagne Gold Botanical Tree */}
      <linearGradient id="goldTreeEmblem" x1="25%" y1="15%" x2="80%" y2="85%">
        <stop offset="0%" stopColor="#F6E5BE" />
        <stop offset="48%" stopColor="#C5A46B" />
        <stop offset="100%" stopColor="#8E6C36" />
      </linearGradient>
    </defs>

    {/* Soft shadow circle under wax */}
    <ellipse cx="100" cy="108" rx="82" ry="78" fill="rgba(66, 25, 35, 0.28)" />

    {/* Organic melted wax silhouette */}
    <path
      d="M101 12
         C116 12, 127 18, 139 23
         C153 28, 168 35, 174 49
         C180 62, 180 74, 185 88
         C190 103, 189 119, 180 133
         C172 146, 165 160, 152 170
         C138 180, 122 185, 105 187
         C88 189, 72 186, 58 178
         C43 170, 30 159, 22 144
         C14 129, 11 113, 14 96
         C17 80, 19 64, 27 50
         C36 35, 52 27, 67 21
         C80 15, 88 12, 101 12 Z"
      fill="url(#burgundyWaxOuter)"
    />

    {/* Wax lip specular highlight */}
    <path
      d="M101 16
         C115 16, 126 21, 137 26
         C150 31, 164 38, 170 50
         C175 62, 175 74, 180 87
         C184 101, 183 116, 175 129
         C168 141, 161 155, 149 164
         C136 173, 121 178, 105 180
         C89 182, 74 179, 61 172
         C47 164, 35 154, 27 140
         C20 126, 17 111, 20 95
         C22 80, 24 65, 32 52
         C40 38, 55 31, 69 25
         C81 19, 89 16, 101 16 Z"
      fill="none"
      stroke="url(#burgundyRimSheen)"
      strokeWidth="2.5"
    />

    {/* Recessed stamp bed */}
    <circle
      cx="100"
      cy="100"
      r="58"
      fill="url(#burgundyWaxBed)"
      stroke="#2D0F16"
      strokeWidth="2.5"
    />
    <circle
      cx="100"
      cy="100"
      r="55.5"
      fill="none"
      stroke="#C5A46B"
      strokeOpacity="0.45"
      strokeWidth="1.2"
    />

    {/* Gold Embossed Botanical Tree */}
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 142 C100 122, 100 98, 100 66" stroke="url(#goldTreeEmblem)" strokeWidth="2.5" fill="none" />
      <path d="M100 126 C89 116, 78 110, 67 104" stroke="url(#goldTreeEmblem)" strokeWidth="1.7" fill="none" />
      <path d="M100 122 C111 112, 122 106, 134 101" stroke="url(#goldTreeEmblem)" strokeWidth="1.7" fill="none" />
      <path d="M100 106 C88 94, 78 86, 70 76" stroke="url(#goldTreeEmblem)" strokeWidth="1.6" fill="none" />
      <path d="M100 103 C112 91, 122 83, 131 74" stroke="url(#goldTreeEmblem)" strokeWidth="1.6" fill="none" />
      <path d="M100 88 C93 78, 88 70, 84 61" stroke="url(#goldTreeEmblem)" strokeWidth="1.4" fill="none" />
      <path d="M100 86 C107 76, 113 69, 117 60" stroke="url(#goldTreeEmblem)" strokeWidth="1.4" fill="none" />

      <g fill="url(#goldTreeEmblem)">
        <path d="M100 54 C96 60, 96 67, 100 71 C104 67, 104 60, 100 54 Z" />
        <path d="M84 58 C80 64, 82 70, 87 72 C90 67, 89 61, 84 58 Z" />
        <path d="M117 57 C121 63, 119 69, 114 71 C111 66, 112 60, 117 57 Z" />
        <path d="M67 72 C65 78, 69 83, 74 83 C76 77, 73 73, 67 72 Z" />
        <path d="M80 79 C75 82, 74 88, 79 91 C84 89, 85 83, 80 79 Z" />
        <path d="M90 73 C84 74, 82 80, 86 84 C91 83, 93 78, 90 73 Z" />
        <path d="M134 70 C136 76, 132 81, 127 81 C125 75, 128 71, 134 70 Z" />
        <path d="M121 77 C126 80, 127 86, 122 89 C117 87, 116 81, 121 77 Z" />
        <path d="M110 72 C116 73, 118 79, 114 83 C109 82, 107 77, 110 72 Z" />
        <path d="M63 101 C62 108, 67 112, 73 110 C74 104, 69 101, 63 101 Z" />
        <path d="M76 108 C71 112, 72 118, 78 119 C83 116, 82 110, 76 108 Z" />
        <path d="M88 113 C82 115, 81 121, 86 124 C91 122, 92 117, 88 113 Z" />
        <path d="M137 98 C138 105, 133 109, 127 107 C126 101, 131 98, 137 98 Z" />
        <path d="M124 106 C129 110, 128 116, 122 117 C117 114, 118 108, 124 106 Z" />
        <path d="M112 112 C118 114, 119 120, 114 123 C109 121, 108 116, 112 112 Z" />
        <circle cx="94" cy="95" r="2.2" />
        <circle cx="107" cy="93" r="2.2" />
        <circle cx="100" cy="78" r="2.1" />
      </g>
    </g>

    {/* Golden fracture fissures on click */}
    {glowing && (
      <g stroke="#FFF3D2" strokeWidth="1.9" strokeLinecap="round" fill="none">
        <path d="M100 100 L64 26" />
        <path d="M100 100 L150 32" />
        <path d="M100 100 L20 96" />
        <path d="M100 100 L182 104" />
        <path d="M100 100 L56 172" />
        <path d="M100 100 L146 170" />
      </g>
    )}
  </svg>
);

export const WaxSeal: React.FC<WaxSealProps> = ({
  isOpening,
  onPress,
  ariaLabel,
}) => {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
      {/* Subtle golden glow pulse */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-1 rounded-full transition-opacity duration-300 ${
          isOpening ? 'opacity-0' : 'animate-seal-glow'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(197, 164, 107, 0.42) 0%, rgba(103, 39, 53, 0.14) 55%, transparent 75%)',
        }}
      />

      {/* Interactive seal button — 0ms response on tap */}
      <button
        type="button"
        onClick={onPress}
        disabled={isOpening}
        aria-label={ariaLabel}
        className={`group relative w-full h-full rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46B] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5EBDD] ${
          isOpening
            ? 'pointer-events-none opacity-0 scale-90 transition-all duration-150'
            : 'animate-seal-breath hover:scale-[1.04] active:scale-[0.93] transition-transform duration-150'
        }`}
      >
        <BurgundySealSvg />
        {/* Light reflection sheen on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, rgba(255, 249, 240, 0.25) 0%, transparent 60%)',
          }}
        />
      </button>

      {/* Instantaneous CSS compositor shards bursting on click */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          isOpening ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {SHARDS.map((s) => (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{
              clipPath: s.clip,
              transform: isOpening
                ? `translate3d(${s.tx}, ${s.ty}, 0) rotate(${s.rot}) scale(0.68)`
                : 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
              opacity: isOpening ? 0 : 1,
              transition: `transform 520ms cubic-bezier(0.16, 1, 0.3, 1) ${s.delay}, opacity 460ms ease-out ${s.delay}`,
              willChange: 'transform, opacity',
            }}
          >
            <BurgundySealSvg glowing />
          </div>
        ))}
      </div>
    </div>
  );
};
