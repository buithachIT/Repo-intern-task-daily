'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-lg border-t z-50">
          <nav className="flex flex-col px-4 py-3 space-y-2 text-sm">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">
              Home
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:underline">
              Blog
            </Link>
            <Link
              href="/blog/category"
              onClick={() => setIsOpen(false)}
              className="hover:underline"
            >
              Category
            </Link>
            <Link href="/about-us" onClick={() => setIsOpen(false)} className="hover:underline">
              About Us
            </Link>

            <div className="pt-2 border-t flex flex-col gap-2">
              <button className="bg-gray-200 px-3 py-1 rounded">Sign in</button>
              <button className="bg-secondary px-3 py-1 rounded text-black hover:text-white">
                Sign up
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
