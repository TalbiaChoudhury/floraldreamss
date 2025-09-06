// components/staggeredFadeIn.tsx

"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';

interface StaggeredFadeInProps {
  children: React.ReactNode;
  index: number;
}

const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ children, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`
        transition-all 
        ease-in-out 
        duration-1000 
        ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
      `}
      style={{
        // 👇 MODIFIED: Using the modulo operator to reset the delay per row
        transitionDelay: `${1}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default StaggeredFadeIn;