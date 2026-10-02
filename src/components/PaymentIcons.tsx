import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Mastercard: Authentic overlapping red and orange-gold circles
export const MastercardIcon: React.FC<IconProps> = ({ className = 'h-5 w-auto', size }) => (
  <svg
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size, width: 'auto' } : undefined}
  >
    <rect width="38" height="24" rx="4" fill="#FFFFFF" />
    <circle cx="15" cy="12" r="7" fill="#EB001B" />
    <circle cx="23" cy="12" r="7" fill="#F79E1B" fillOpacity="0.9" />
    <path
      d="M19 6.8a6.97 6.97 0 012.3 5.2 6.97 6.97 0 01-2.3 5.2 6.97 6.97 0 01-2.3-5.2A6.97 6.97 0 0119 6.8z"
      fill="#FF5F00"
    />
  </svg>
);

// Visa: Authentic classic blue brand mark with yellow accent flick
export const VisaIcon: React.FC<IconProps> = ({ className = 'h-5 w-auto', size }) => (
  <svg
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size, width: 'auto' } : undefined}
  >
    <rect width="38" height="24" rx="4" fill="#FFFFFF" />
    <path
      d="M14.6 17.2L16.8 6.8H19.5L17.3 17.2H14.6ZM25.4 7C24.8 6.8 23.9 6.6 22.8 6.6C20 6.6 18.1 8 18.1 10.1C18.1 11.6 19.5 12.4 20.6 12.9C21.6 13.4 22 13.7 22 14.2C22 14.9 21.1 15.2 20.3 15.2C19.2 15.2 18.5 14.9 18 14.6L17.4 17C18.1 17.3 19.3 17.5 20.5 17.5C23.5 17.5 25.4 16 25.4 13.8C25.4 12.1 24.3 11.1 22.6 10.2C21.8 9.7 21.3 9.4 21.3 8.9C21.3 8.4 21.9 8 22.9 8C23.8 8 24.5 8.2 25 8.4L25.4 7ZM31.4 17.2H33.8L31.7 6.8H29.5C29 6.8 28.6 7.1 28.4 7.6L24.2 17.2H27L27.6 15.6H30.9L31.4 17.2ZM28.4 13.4L29.7 9.8L30.5 13.4H28.4ZM12.7 6.8L10.2 13.9L9.9 12.4C9.5 11 8.3 9.4 6.8 8.6L9.1 17.2H11.9L16.1 6.8H12.7Z"
      fill="#1A1F71"
    />
    <path
      d="M8.2 6.8H4.2L4.1 7C7.3 7.8 9.5 9.7 10.3 12.2L9.5 7.7C9.3 7.1 8.8 6.8 8.2 6.8Z"
      fill="#F7B600"
    />
  </svg>
);

// Verve: Authentic Nigerian payment card badge
export const VerveIcon: React.FC<IconProps> = ({ className = 'h-5 w-auto', size }) => (
  <svg
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size, width: 'auto' } : undefined}
  >
    <rect width="38" height="24" rx="4" fill="#FFFFFF" />
    {/* Verve signature curved ribbons (green and red) */}
    <path
      d="M7 6C9 6 12 8 13.5 11C15 14 17 18 19.5 18C22 18 24 14 25.5 11C27 8 30 6 32 6"
      stroke="#ED1C24"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M6 18C8 18 10 16 11.5 13C13 10 15 6 17.5 6C20 6 22 10 23.5 13C25 16 27 18 29 18"
      stroke="#008853"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <text
      x="19"
      y="21"
      textAnchor="middle"
      fill="#1E2A38"
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: '6.5px',
        fontWeight: 800,
        letterSpacing: '0.4px',
      }}
    >
      VERVE
    </text>
  </svg>
);

// Bank Transfer: Nigerian NIP / Instant Wire Transfer badge
export const BankTransferIcon: React.FC<IconProps> = ({ className = 'h-5 w-auto', size }) => (
  <svg
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size, width: 'auto' } : undefined}
  >
    <rect width="38" height="24" rx="4" fill="#20221F" stroke="#383A37" strokeWidth="1" />
    {/* Bank Columns Icon in cream */}
    <path
      d="M19 5.5L9 10.5V11.5H29V10.5L19 5.5Z"
      fill="#FAF7EE"
    />
    <rect x="11" y="12.5" width="2" height="5" fill="#FAF7EE" />
    <rect x="15" y="12.5" width="2" height="5" fill="#FAF7EE" />
    <rect x="21" y="12.5" width="2" height="5" fill="#FAF7EE" />
    <rect x="25" y="12.5" width="2" height="5" fill="#FAF7EE" />
    <rect x="8" y="18" width="22" height="1.8" rx="0.5" fill="#FAF7EE" />
  </svg>
);

export const PaymentIconsList: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors shadow-2xs">
        <MastercardIcon className="h-4 w-auto rounded-xs" />
        <span className="text-[11px] font-semibold text-[#FAF7EE]">Mastercard</span>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors shadow-2xs">
        <VisaIcon className="h-4 w-auto rounded-xs" />
        <span className="text-[11px] font-semibold text-[#FAF7EE]">Visa</span>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors shadow-2xs">
        <VerveIcon className="h-4 w-auto rounded-xs" />
        <span className="text-[11px] font-semibold text-[#FAF7EE]">Verve</span>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors shadow-2xs">
        <BankTransferIcon className="h-4 w-auto rounded-xs" />
        <span className="text-[11px] font-semibold text-[#FAF7EE]">Transfer</span>
      </div>
    </div>
  );
};
