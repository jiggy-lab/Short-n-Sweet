import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PaymentIconsList } from './PaymentIcons';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#20221F] text-[#FAF7EE] border-t border-[#383A37] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#383A37]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size={52} />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7EE] block">
                  Short n’ Sweet
                </span>
                <span className="text-xs uppercase tracking-wider text-[#A7BFA9]">
                  Lagos, Nigeria
                </span>
              </div>
            </div>
            <p className="font-serif text-lg text-[#EAE4CE] italic max-w-sm pt-2">
              “Comfort in every single bite.”
            </p>
            <p className="text-sm text-[#D1D5CE] leading-relaxed max-w-sm">
              We are a delivery-only artisan bakery in Gbagada, Lagos. No occasion needed — we bake and send warm comfort straight to your door, seven days a week.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#A7BFA9] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7EE]">
              <li>
                <button
                  onClick={() => onNavigate('/menu')}
                  className="hover:text-[#A7BFA9] transition-colors"
                >
                  Our Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#A7BFA9] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#A7BFA9] transition-colors"
                >
                  Contact & Custom Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/track-order')}
                  className="hover:text-[#A7BFA9] transition-colors"
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Bakery Delivery Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#A7BFA9] font-semibold">
              Delivery & Kitchen
            </h4>
            <p className="text-sm text-[#D1D5CE] leading-relaxed">
              Kitchen based in Gbagada, Lagos, Nigeria.
            </p>
            <div className="text-xs text-[#EAE4CE] space-y-1 pt-1">
              <p>• ₦2,500 flat delivery nationwide</p>
              <p>• Daily baking dispatch (Mon – Sun)</p>
              <p>• Cakes require 2 days advance notice</p>
            </div>
          </div>

          {/* Payment & Portfolio Simulation Note */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#A7BFA9] font-semibold">
              Accepted Payments
            </h4>
            <PaymentIconsList />
            <p className="text-[11px] text-[#A7BFA9] pt-1 leading-normal">
              Portfolio demonstration project. Checkout simulates payment without real financial charges.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E948D] gap-4">
          <p>© {new Date().getFullYear()} Short n’ Sweet Bakery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Portfolio Project by Adesegun Feranmi</span>
            <span>·</span>
            <span>Gbagada, Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
