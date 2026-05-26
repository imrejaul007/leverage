import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg', tagline: 'text-xs' },
    md: { icon: 40, text: 'text-xl', tagline: 'text-sm' },
    lg: { icon: 48, text: 'text-2xl', tagline: 'text-base' },
  };

  const s = sizes[size];

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className="relative" style={{ width: s.icon, height: s.icon }}>
        <Image
          src="/logo.png"
          alt="LEVERAGE Logo"
          width={s.icon}
          height={s.icon}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className={`${s.text} text-[#C49A6C] font-bold brand-font leading-none`}>LEVERAGE</span>
        {showTagline && (
          <span className={`${s.tagline} text-[#D8CCBC]/60 leading-none mt-0.5`}>Connecting Dots to Ports</span>
        )}
      </div>
    </Link>
  );
}
