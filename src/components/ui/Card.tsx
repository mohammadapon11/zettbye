'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ANIMATION_VARIANTS } from '@/lib/constants';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  animate?: boolean;
}

/**
 * Reusable Card component with advanced animations and variants
 */
export function Card({
  children,
  className,
  hover = false,
  clickable = false,
  onClick,
  variant = 'default',
  animate = true,
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-gray-200',
  };

  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1' : '';
  const clickableClasses = clickable ? 'cursor-pointer select-none' : '';

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    clickableClasses,
    className
  );

  const MotionCard = motion.div;

  if (!animate) {
    return (
      <div className={cardClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <MotionCard
      className={cardClasses}
      onClick={onClick}
      {...ANIMATION_VARIANTS.fadeIn}
      whileHover={hover ? { 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      } : undefined}
      whileTap={clickable ? { 
        scale: 0.95,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.1 }
      } : undefined}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {children}
    </MotionCard>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('p-6 pt-4 border-t border-gray-100', className)}>
      {children}
    </div>
  );
}
