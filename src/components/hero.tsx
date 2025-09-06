// components/hero.tsx

import React from 'react';
import Image from 'next/image';
import Button from './button';

const Hero = () => {
  return (
    // Added z-10 for layering and bg-background to make it opaque
    <section className="relative min-h-screen max-h-screen items-center justify-center flex">
      
      {/* The decorative border now sits in the middle layer (z-10) */}
      <Image
        alt="A decorative floral border design"
        src="/images/floral border.png"
        className="object-contain spin-slow z-10"
        priority
        width={800}
        height={800}
      />

      {/* The bottom layer of the logo text (z-0) */}
      {/* This will appear BEHIND the floral border */}
      <Image
        alt="A decorative floral logo text"
        src="/images/floral logo text.png"
        className="object-contain z-0"
        priority
        fill
      />

      {/* The top layer of the logo text (z-30), clipped */}
      {/* This will appear IN FRONT of the floral border and the button */}
      <Image
        alt="" // Alt text is empty for decorative duplicates
        aria-hidden="true" // Hide from screen readers
        src="/images/floral logo text.png"
        className="object-contain fade-in z-30 [clip-path:inset(0_50%_0_0)]"
        priority
        fill
      />

      {/* The button section is positioned at z-20 */}
      <section className="absolute bottom-1/4 left-1/2 w-full max-w-[1200px] -translate-x-1/2 z-20 flex flex-col items-center">
        {/* --- THIS IS THE LINE TO CHANGE --- */}
        <a href="#explore">
          <Button>
            Shop Now
          </Button>
        </a>
      </section>

    </section>
  );
};

export default Hero;