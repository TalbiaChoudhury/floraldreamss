// components/fadeInOut.tsx

"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInOutProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInOut: React.FC<FadeInOutProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    // --- Options ---
    // triggerOnce: false means the animation will trigger every time the element enters/leaves
    triggerOnce: false, 
    // threshold: 0 means the animation will trigger as soon as any part of the element is visible
    threshold: 0.1, 
  });

  return (
    <div
      ref={ref}
      className={`
        // --- Base Transition Styles ---
        transition-opacity 
        ease-in-out 
        duration-1000 
        
        // --- Conditional Opacity ---
        // If 'inView' is true, set opacity to 100, otherwise 0
        ${inView ? 'opacity-100' : 'opacity-0'}
        
        // --- Allow custom classes to be passed in ---
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default FadeInOut;