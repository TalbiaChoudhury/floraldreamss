import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        // --- Base Styles ---
        bg-primary
        text-foreground
        font-medium
        uppercase
        cursor-pointer
        
        // --- Responsive Sizing & Font ---
        text-[11px] md:text-xs
        tracking-widest
        py-3 md:py-4
        px-5 md:px-6
        
        // --- Border & Shape ---
        border
        border-foreground // Border color is now black
        
        // --- Hover Effect & Transitions ---
        hover:bg-secondary
        hover:text-foreground
        hover:border-foreground
        transition-all 
        ease-in-out 
        duration-300
        
        // --- Custom Classes ---
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
