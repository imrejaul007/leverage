'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const router = useRouter();

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const variantStyles = {
    primary: 'bg-[#154230] text-white hover:bg-[#1d5240] shadow-md hover:shadow-lg',
    secondary: 'bg-[#A6824A] text-white hover:bg-[#8a6a3a] shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#154230] text-[#154230] hover:bg-[#154230] hover:text-white',
  };

  const content = (
    <>
      {children}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        →
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </motion.button>
  );
}

// Ripple effect button
export function RippleButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      left: ${x - 50}px;
      top: ${y - 50}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}

// Glow button with pulsing effect
export function GlowButton({
  children,
  onClick,
  color = '#154230',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          `0 0 20px ${color}40`,
          `0 0 40px ${color}60`,
          `0 0 20px ${color}40`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`px-6 py-3 bg-[${color}] text-white font-semibold rounded-xl shadow-lg ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Magnetic button that follows cursor
export function MagneticButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}