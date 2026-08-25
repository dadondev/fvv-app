import React from 'react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  expression?: 'happy' | 'waving' | 'excited' | 'thinking';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 'md',
  showLabel = true,
  expression = 'waving',
  className = '',
}) => {
  const sizeMap = {
    sm: { w: 60, h: 72, fontSize: '9px' },
    md: { w: 100, h: 120, fontSize: '13px' },
    lg: { w: 140, h: 168, fontSize: '17px' },
    xl: { w: 180, h: 215, fontSize: '21px' },
  };

  const { w, h } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-200 hover:scale-105"
      >
        {/* Soft shadow */}
        <ellipse cx="100" cy="228" rx="48" ry="8" fill="#1b1c1c" fillOpacity="0.1" />

        {/* Feet / Legs */}
        <path
          d="M74 186 C74 205 60 216 75 220 C88 223 93 205 91 188 Z"
          fill="#3db300"
          stroke="#1f5100"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M126 186 C126 205 140 216 125 220 C112 223 107 205 109 188 Z"
          fill="#3db300"
          stroke="#1f5100"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Left Arm / Waving Hand */}
        {expression === 'waving' || expression === 'excited' ? (
          <g className="animate-pulse origin-bottom-left" style={{ animationDuration: '3s' }}>
            {/* Arm sleeve */}
            <path
              d="M58 108 C42 98 34 85 45 74 C52 68 62 82 66 98 Z"
              fill="#4cdb05"
              stroke="#1f5100"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Blue Glove Hand */}
            <path
              d="M42 78 C35 72 32 60 40 54 C48 48 55 58 56 66 C61 63 67 67 65 74 C63 80 52 86 42 78 Z"
              fill="#0284c7"
              stroke="#0369a1"
              strokeWidth="3.5"
            />
            {/* Glove thumb */}
            <path
              d="M36 67 C32 63 36 57 41 60 C44 63 43 68 39 70 Z"
              fill="#0284c7"
              stroke="#0369a1"
              strokeWidth="3"
            />
          </g>
        ) : (
          <path
            d="M58 112 C44 125 40 145 52 150 C58 152 64 140 68 126 Z"
            fill="#4cdb05"
            stroke="#1f5100"
            strokeWidth="4"
          />
        )}

        {/* Right Arm */}
        <g>
          <path
            d="M142 108 C158 120 166 138 155 146 C148 150 142 138 138 122 Z"
            fill="#4cdb05"
            stroke="#1f5100"
            strokeWidth="4"
          />
          <path
            d="M155 142 C164 146 168 158 160 164 C154 168 146 160 145 152 C141 155 137 151 138 145 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="3.5"
          />
        </g>

        {/* Main Shield Body */}
        {/* Outer shield rim (dark green) */}
        <path
          d="M48 64 C48 54 152 54 152 64 C152 120 155 160 100 192 C45 160 48 120 48 64 Z"
          fill="#35a300"
          stroke="#1e5000"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Inner shield face (bright lively green) */}
        <path
          d="M56 68 C56 60 144 60 144 68 C144 116 146 150 100 178 C54 150 56 116 56 68 Z"
          fill="#58cc02"
        />

        {/* Safety Vest (Yellow with reflective stripes) */}
        {/* Left Vest panel */}
        <path
          d="M56 100 C58 134 76 154 88 165 L88 108 C78 104 66 102 56 100 Z"
          fill="#ffd500"
          stroke="#ca8a04"
          strokeWidth="3"
        />
        {/* Right Vest panel */}
        <path
          d="M144 100 C142 134 124 154 112 165 L112 108 C122 104 134 102 144 100 Z"
          fill="#ffd500"
          stroke="#ca8a04"
          strokeWidth="3"
        />

        {/* Reflective silver stripes on vest */}
        <path
          d="M57 114 C66 116 77 120 88 124"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M59 132 C68 136 78 142 88 148"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M143 114 C134 116 123 120 112 124"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M141 132 C132 136 122 142 112 148"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Cheeks (Cute blush spots) */}
        <ellipse cx="68" cy="106" rx="8" ry="4.5" fill="#ff7a00" fillOpacity="0.4" />
        <ellipse cx="132" cy="106" rx="8" ry="4.5" fill="#ff7a00" fillOpacity="0.4" />

        {/* Eyes */}
        {/* Left Eye */}
        <ellipse cx="78" cy="94" rx="14" ry="17" fill="#1b1c1c" />
        <ellipse cx="78" cy="93" rx="12" ry="15" fill="#ffffff" />
        <ellipse cx="78" cy="93" rx="9" ry="12" fill="#1b1c1c" />
        {/* Catchlight */}
        <circle cx="75" cy="88" r="4.5" fill="#ffffff" />
        <circle cx="82" cy="97" r="2" fill="#ffffff" />

        {/* Right Eye */}
        <ellipse cx="122" cy="94" rx="14" ry="17" fill="#1b1c1c" />
        <ellipse cx="122" cy="93" rx="12" ry="15" fill="#ffffff" />
        <ellipse cx="122" cy="93" rx="9" ry="12" fill="#1b1c1c" />
        {/* Catchlight */}
        <circle cx="119" cy="88" r="4.5" fill="#ffffff" />
        <circle cx="126" cy="97" r="2" fill="#ffffff" />

        {/* Happy Smile */}
        <path
          d="M90 106 Q100 118 110 106"
          stroke="#1b1c1c"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Safety Helmet (Yellow Hardhat with Red Emergency Cross) */}
        {/* Helmet Rim */}
        <path
          d="M46 54 C46 51 52 48 100 48 C148 48 154 51 154 54 C154 58 144 60 100 60 C56 60 46 58 46 54 Z"
          fill="#eab308"
          stroke="#a16207"
          strokeWidth="4"
        />
        {/* Helmet Dome */}
        <path
          d="M58 50 C58 20 80 12 100 12 C120 12 142 20 142 50 Z"
          fill="#facc15"
          stroke="#a16207"
          strokeWidth="4.5"
        />
        {/* Helmet Ridge Highlight */}
        <path
          d="M93 13 C93 13 97 12 100 12 C103 12 107 13 107 13 L107 50 L93 50 Z"
          fill="#fde047"
        />

        {/* Red Medical / First Aid Cross */}
        <rect x="94" y="24" width="12" height="20" rx="2" fill="#dc2626" />
        <rect x="90" y="28" width="20" height="12" rx="2" fill="#dc2626" />
      </svg>

      {showLabel && (
        <div className="text-center mt-1">
          <div className="font-extrabold tracking-tight text-[#2b6c00] leading-none" style={{ fontSize: sizeMap[size].fontSize }}>
            Favqulodda
          </div>
          <div className="font-extrabold tracking-tight text-[#2b6c00] leading-none mt-0.5" style={{ fontSize: sizeMap[size].fontSize }}>
            Vaziyatlar
          </div>
        </div>
      )}
    </div>
  );
};
