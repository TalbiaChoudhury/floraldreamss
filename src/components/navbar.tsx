"use client";

import React, { useState, useEffect } from 'react';

// --- SVG Icon Components ---
// Inlined SVG components to resolve the persistent dependency issue.
// This is necessary as the environment cannot resolve the 'react-icons' package.

const UserIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SearchIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ShoppingBagIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const MenuIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navbarClasses = hasScrolled
    ? 'bg-secondary border-gray-200 shadow-md'
    : 'bg-transparent border-transparent';

  const linkClasses = hasScrolled ? 'text-black' : 'text-black';

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full py-4 px-6 md:px-12 flex justify-between items-center border-b transition-all ease-in-out duration-500 ${navbarClasses}`}
      >
        <div className="flex items-center">
          <div className={`hover:text-primary hidden md:block font-cinzel tracking-wider cursor-pointer transition-colors ease-in-out duration-500 ${linkClasses}`}>
            F l o r a l  D r e a m s s
          </div>
          <button
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className={`md:hidden ${linkClasses}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-10">
            <li>
              <a
                href="#explore"
                className={`${linkClasses} hover:text-primary text-sm font-bold uppercase tracking-widest cursor-pointer transition-all ease-in-out duration-500`}
              >
                Explore
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`${linkClasses} hover:text-primary text-sm font-bold uppercase tracking-widest cursor-pointer transition-all ease-in-out duration-500`}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className={`flex items-center space-x-5 transition-colors ease-in-out duration-500 ${linkClasses}`}>
          <button aria-label="User account" className="hover:text-primary cursor-pointer transition-all ease-in-out duration-300">
            <UserIcon />
          </button>
          <button aria-label="Search" className="hover:text-primary cursor-pointer transition-all ease-in-out duration-300">
            <SearchIcon />
          </button>
          <button aria-label="Shopping bag" className="hover:text-primary cursor-pointer transition-all ease-in-out duration-300">
            <ShoppingBagIcon />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-background z-40 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav>
          <ul className="flex flex-col items-center space-y-8">
            <li>
              <a
                href="#explore"
                onClick={() => setIsMenuOpen(false)}
                className={`text-black hover:text-primary text-lg font-bold uppercase tracking-widest cursor-pointer`}
              >
                Explore
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className={`text-black hover:text-primary text-lg font-bold uppercase tracking-widest cursor-pointer`}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
