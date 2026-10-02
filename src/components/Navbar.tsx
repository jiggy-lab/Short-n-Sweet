import React, { useState } from 'react';
import { ShoppingBag, Search, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', path: '/menu' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Track Order', path: '/track-order' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-b border-[#EAE4CE] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#383A37]"
          >
            <BrandLogo size={42} />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#20221F] group-hover:text-[#5C7461] transition-colors">
                Short n’ Sweet
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#717670] -mt-1 hidden sm:block">
                Gbagada · Lagos
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#383A37]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/menu' && currentPath.startsWith('/product'));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#20221F] font-semibold'
                    : 'text-[#4B4E4A] hover:text-[#20221F]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C7461] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Bag, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch || (() => handleNavClick('/menu'))}
            aria-label="Search treats"
            className="p-2 text-[#4B4E4A] hover:text-[#20221F] hover:bg-[#F5F0D9] rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bag button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping bag with ${totalCount} items`}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#20221F] text-[#FAF7EE] rounded-full hover:bg-[#383A37] transition-all text-xs font-medium tracking-wide uppercase shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-[#FAF7EE] text-[#20221F] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {totalCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#20221F] hover:bg-[#F5F0D9] rounded-lg transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAE4CE] bg-[#FAF7EE] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EAE4CE] text-[#20221F] font-semibold'
                    : 'text-[#4B4E4A] hover:bg-[#F5F0D9]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#EAE4CE] flex items-center justify-between text-xs text-[#717670] px-3">
            <span>Delivery: ₦2,500 Nationwide</span>
            <span className="text-[#5C7461]">Mon – Sun</span>
          </div>
        </div>
      )}
    </header>
  );
};
