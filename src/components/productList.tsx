// components/productList.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import StaggeredFadeIn from './staggeredFadeIn';

// --- SVG Icon Components ---
const SortIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
  </svg>
);

const FilterIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);


interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  status: 'featured' | 'sale' | 'out-of-stock' | 'default';
  discount?: number;
}

const products: Product[] = [
  { id: 1, name: 'Flowers 1', price: 75.00, status: 'featured' },
  { id: 2, name: 'Flowers 2', price: 60.00, status: 'default' },
  { id: 3, name: 'Flowers 3', price: 24.00, originalPrice: 30.00, status: 'sale', discount: 20 },
  { id: 4, name: 'Flowers 4', price: 45.00, status: 'default' },
  { id: 5, name: 'Flowers 5', price: 85.00, status: 'default' },
  { id: 6, name: 'Flowers 6', price: 15.00, originalPrice: 25.00, status: 'sale', discount: 40 },
  { id: 7, name: 'Flowers 7', price: 22.00, status: 'out-of-stock' },
  { id: 8, name: 'Flowers 8', price: 38.00, status: 'default' },
  { id: 9, name: 'Flowers 9', price: 18.00, status: 'featured' },
  { id: 10, name: 'Flowers 10', price: 95.00, status: 'default' },
  { id: 11, name: 'Flowers 11', price: 42.00, originalPrice: 50.00, status: 'sale', discount: 16 },
  { id: 12, name: 'Flowers 12', price: 12.00, status: 'default' },
  { id: 13, name: 'Flowers 13', price: 30.00, status: 'default' },
  { id: 14, name: 'Flowers 14', price: 65.00, status: 'out-of-stock' },
  { id: 15, name: 'Flowers 15', price: 55.00, status: 'default' },
  { id: 16, name: 'Flowers 16', price: 28.00, status: 'featured' },
];

const ProductList: React.FC = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const inlineSortRef = useRef<HTMLDivElement>(null);
  const floatingSortRef = useRef<HTMLDivElement>(null);
  const { ref: controlsRef, inView: areControlsInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inlineSortRef.current?.contains(event.target as Node)) return;
      if (floatingSortRef.current?.contains(event.target as Node)) return;
      setIsSortOpen(false);
    };

    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  const renderBadge = (product: Product) => {
    // 👇 MODIFIED: Added z-10 to all badges
    if (product.status === 'featured') {
      return (
        <div className="absolute top-3 left-3 bg-primary text-foreground text-[10px] font-semibold uppercase px-2 py-1 tracking-wider z-10">
          Featured
        </div>
      );
    }
    if (product.status === 'sale' && product.discount) {
      return (
        <div className="absolute top-3 left-3 bg-primary text-foreground text-[10px] font-semibold uppercase px-2 py-1 tracking-wider z-10">
          -{product.discount}%
        </div>
      );
    }
    if (product.status === 'out-of-stock') {
      return (
        <div className="absolute top-3 left-3 bg-secondary text-foreground text-[10px] font-semibold uppercase px-2 py-1 tracking-wider border border-gray-300 z-10">
          Out of stock
        </div>
      );
    }
    return null;
  };
  
  const renderPrice = (product: Product) => (
    <div className="mt-2 text-sm text-foreground">
      {product.status === 'sale' && product.originalPrice ? (
        <span>
          <span className="text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
          <span className="ml-2 font-bold">${product.price.toFixed(2)}</span>
        </span>
      ) : (
        <span>${product.price.toFixed(2)}</span>
      )}
    </div>
  );

  return (
    <section id="explore" className="w-full bg-background py-16 px-6 md:px-12">
      <h2 className="text-4xl text-center mb-4">
        Explore products
      </h2>

      <div ref={controlsRef} className="flex justify-center items-center gap-6 mb-8">
        <div ref={inlineSortRef} className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center space-x-2 text-sm text-foreground/80 hover:text-primary cursor-pointer transition-colors"
          >
            <SortIcon />
            <span>Sort</span>
          </button>
          
          {isSortOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-secondary border border-foreground/10 shadow-lg z-10 rounded-lg overflow-hidden">
              <ul>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Alphabetical, A-Z</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Alphabetical, Z-A</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Price, low to high</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Price, high to low</li>
              </ul>
            </div>
          )}
        </div>

        <button
          className="flex items-center space-x-2 text-sm text-foreground/80 hover:text-primary cursor-pointer transition-colors"
        >
          <FilterIcon />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <StaggeredFadeIn key={product.id} index={index}>
            <div className="group text-center">
              <div className="relative bg-white w-full aspect-square overflow-hidden">
                {renderBadge(product)}
                <Image
                  src="/images/floral border.png"
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground tracking-wide">
                {product.name}
              </h3>
              <div className="mt-1 text-xs text-foreground">
                {renderPrice(product)}
              </div>
            </div>
          </StaggeredFadeIn>
        ))}
      </div>

      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20
                    transition-all duration-300 ease-in-out
                    ${areControlsInView ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div ref={floatingSortRef} className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-background text-foreground/90 shadow-lg hover:bg-secondary cursor-pointer transition-colors duration-200 text-sm font-medium"
          >
            <SortIcon className="w-4 h-4" />
            <span>Sort</span>
          </button>
          {isSortOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary border border-foreground/10 shadow-lg z-10 rounded-lg overflow-hidden">
              <ul>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Alphabetical, A-Z</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Alphabetical, Z-A</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Price, low to high</li>
                <li className="px-4 py-2 text-sm hover:bg-primary/20 cursor-pointer">Price, high to low</li>
              </ul>
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background text-foreground/90 shadow-lg hover:bg-secondary cursor-pointer transition-colors duration-200 text-sm font-medium"
        >
          <FilterIcon className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

    </section>
  );
};

export default ProductList;