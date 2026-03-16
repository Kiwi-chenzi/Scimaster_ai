export const Logo = () => (
  <div className="flex items-center">
    <img src="/scimaster_logo.svg" alt="SciMaster" className="h-6" />
  </div>
);

export const LogoSmall = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#1F2937"/>
    <circle cx="12" cy="12" r="4" fill="url(#paint0_linear_small)"/>
    <defs>
      <linearGradient id="paint0_linear_small" x1="8" y1="8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
  </svg>
);
