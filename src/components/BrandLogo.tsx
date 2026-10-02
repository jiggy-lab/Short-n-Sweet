import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 48,
  showWordmark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-3"
      >
        {/* Outer Circular Cream Badge */}
        <circle cx="100" cy="100" r="96" fill="#FBF8EE" />

        {/* Outer Sage Green Double Rings */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="#5C7461"
          strokeWidth="3.5"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#7A937F"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Decorative Steam / Aroma Lines */}
        <path
          d="M96 35 C95 31 99 28 98 24"
          stroke="#5C7461"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M102 34 C101 30 105 27 104 23"
          stroke="#5C7461"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M108 36 C107 32 111 29 110 25"
          stroke="#5C7461"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Illustrations Group: Cupcake, Croissant, Cake Slice */}
        {/* 1. Cupcake (Left) */}
        <g transform="translate(68, 52)">
          {/* Cupcake Liner */}
          <path
            d="M5 24 L8 38 C8 39 18 39 18 38 L21 24 Z"
            fill="#F3E9DA"
            stroke="#BD5E44"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="9" y1="24" x2="11" y2="38" stroke="#BD5E44" strokeWidth="1" />
          <line x1="13" y1="24" x2="13" y2="38" stroke="#BD5E44" strokeWidth="1" />
          <line x1="17" y1="24" x2="15" y2="38" stroke="#BD5E44" strokeWidth="1" />
          {/* Swirl Frosting */}
          <path
            d="M4 24 C2 18 8 13 13 13 C14 10 18 10 19 13 C24 13 25 18 22 24 Z"
            fill="#FFF"
            stroke="#BD5E44"
            strokeWidth="1.5"
          />
          <path
            d="M8 19 C13 16 16 19 20 18"
            stroke="#BD5E44"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Cherry / Sprinkles */}
          <circle cx="13" cy="11" r="2" fill="#BD5E44" />
        </g>

        {/* 2. Flaky Croissant (Center) */}
        <g transform="translate(90, 48)">
          <path
            d="M1 28 C-3 20 6 12 18 12 C30 12 39 20 35 28 C30 26 25 24 18 24 C11 24 6 26 1 28 Z"
            fill="#EED9B9"
            stroke="#BD5E44"
            strokeWidth="1.5"
          />
          <path
            d="M8 17 C13 15 23 15 28 17"
            stroke="#BD5E44"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12 21 C15 19 21 19 24 21"
            stroke="#BD5E44"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Layered Cake Slice (Right) */}
        <g transform="translate(122, 54)">
          <path
            d="M2 32 L26 32 L32 20 L8 20 Z"
            fill="#F3EAD6"
            stroke="#5C7461"
            strokeWidth="1.5"
          />
          {/* Layer Cream in Sage */}
          <path
            d="M4 26 L28 26 L30 23 L6 23 Z"
            fill="#A7BFA9"
          />
          {/* Top Icing & Cherry */}
          <path
            d="M8 20 L32 20 L24 16 L2 20 Z"
            fill="#FFF"
            stroke="#5C7461"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="14" r="2" fill="#BD5E44" />
        </g>

        {/* Decorative Confetti Sprinkles (Top Arc) */}
        <rect x="52" y="70" width="6" height="2" rx="1" transform="rotate(-30 52 70)" fill="#7A937F" />
        <circle cx="48" cy="85" r="2" fill="#BD5E44" />
        <rect x="146" y="74" width="7" height="2.5" rx="1.2" transform="rotate(25 146 74)" fill="#BD5E44" />
        <rect x="156" y="86" width="6" height="2" rx="1" transform="rotate(-40 156 86)" fill="#7A937F" />

        {/* Brand Name Script: "Short n' Sweet" */}
        <g id="brand-text">
          <text
            x="100"
            y="126"
            textAnchor="middle"
            fill="#BD5E44"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px'
            }}
          >
            Short n’ Sweet
          </text>
        </g>

        {/* Subtitle: "cakes • pastries • small treats" */}
        <text
          x="100"
          y="146"
          textAnchor="middle"
          fill="#5C7461"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1px'
          }}
        >
          cakes · pastries · small treats
        </text>

        {/* Bottom Sprinkles Cluster */}
        <g transform="translate(85, 160)">
          <rect x="0" y="4" width="6" height="2" rx="1" transform="rotate(-25 0 4)" fill="#BD5E44" />
          <circle cx="15" cy="5" r="2" fill="#5C7461" />
          <rect x="24" y="2" width="6" height="2" rx="1" transform="rotate(30 24 2)" fill="#BD5E44" />
        </g>
      </svg>

      {showWordmark && (
        <div className="flex flex-col text-left">
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#20221F]">
            Short n’ Sweet
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#5C7461] font-medium -mt-1">
            Gbagada, Lagos
          </span>
        </div>
      )}
    </div>
  );
};
