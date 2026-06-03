interface LogoProps {
  variant?: 'light' | 'dark' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export default function LegaliLogo({ variant = 'dark', size = 'md', showTagline = false }: LogoProps) {
  const textColor = variant === 'light' ? '#ffffff' : variant === 'orange' ? '#E05A00' : '#1A1A1A';
  const accentColor = '#E05A00';
  const sizes = { sm: { text: 'text-xl', tagline: 'text-xs', icon: 28 }, md: { text: 'text-2xl', tagline: 'text-xs', icon: 36 }, lg: { text: 'text-4xl', tagline: 'text-sm', icon: 52 } };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Pillar icon — two L shapes with i in the middle */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
        {/* Left pillar (L) */}
        <rect x="3" y="4" width="7" height="32" rx="2" fill={accentColor} />
        <rect x="3" y="30" width="13" height="6" rx="2" fill={accentColor} />
        {/* Right pillar (L mirrored) */}
        <rect x="30" y="4" width="7" height="32" rx="2" fill={textColor === '#ffffff' ? '#ffffff' : '#2D2D2D'} />
        <rect x="24" y="30" width="13" height="6" rx="2" fill={textColor === '#ffffff' ? '#ffffff' : '#2D2D2D'} />
        {/* Center i (human) */}
        <circle cx="20" cy="11" r="3" fill={accentColor} />
        <rect x="17.5" y="16" width="5" height="14" rx="2.5" fill={accentColor} />
      </svg>

      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-tight ${s.text}`} style={{ color: textColor }}>
          LEG<span style={{ color: accentColor }}>A</span>Li
        </span>
        {showTagline && (
          <span className={`font-sans font-medium tracking-widest uppercase ${s.tagline} mt-0.5`} style={{ color: variant === 'light' ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}>
            Stay On Guard, Stay Covered
          </span>
        )}
      </div>
    </div>
  );
}
