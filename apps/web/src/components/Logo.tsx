import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8 text-lg', text: 'text-lg', tagline: 'text-xs' },
    md: { icon: 'w-10 h-10 text-xl', text: 'text-2xl', tagline: 'text-sm' },
    lg: { icon: 'w-12 h-12 text-2xl', text: 'text-3xl', tagline: 'text-base' },
  };

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizes[size].icon} rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center shadow-lg shadow-[#C49A6C]/20`}>
        <span className={`text-[#081512] font-bold brand-font`}>L</span>
      </div>
      <div className="flex flex-col">
        <span className={`${sizes[size].text} text-[#C49A6C] font-bold brand-font leading-none`}>LEVERAGE</span>
        {showTagline && (
          <span className={`${sizes[size].tagline} text-[#D8CCBC]/60 leading-none mt-0.5`}>Connecting Dots to Ports</span>
        )}
      </div>
    </Link>
  );
}
