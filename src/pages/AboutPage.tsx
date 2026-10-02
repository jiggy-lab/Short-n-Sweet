import React from 'react';
import { ArrowRight, Check, Heart, Sparkles, Coffee } from 'lucide-react';
import {
  heroCenterpieceImg,
  flakyPastriesImg,
  fudgeBrowniesImg,
  treatBoxImg
} from '../data/products';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF7EE] min-h-screen py-12 md:py-20 text-[#20221F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Editorial Story Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
            Our Story · Gbagada, Lagos
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#20221F] leading-tight text-balance">
            Comfort in every single bite.
          </h1>
          <p className="font-serif text-lg text-[#5A5E59] italic">
            “We started with one simple conviction: good cake shouldn’t wait for a milestone.”
          </p>
        </div>

        {/* Feature Hero Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white/90 bg-[#EAE4CE]">
          <img
            src={heroCenterpieceImg}
            alt="Handcrafted celebration cake in our Gbagada kitchen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Section 1: The Delivery-Only Model */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          <div className="md:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#5C7461] font-bold">
              01 / Why Delivery-Only?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#20221F]">
              No storefront. Just ovens, butter, and dispatch riders.
            </h2>
            <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
              In Lagos, opening a café often means spending 80% of your energy on decor, generators, and seating. We decided to strip all of that away.
            </p>
            <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
              Short n’ Sweet operates out of a dedicated commercial baking kitchen in Gbagada. Every naira we save on high-street rent goes straight into European 84% butter, Belgian Valrhona chocolate, fresh Madagascar vanilla pods, and reliable refrigerated dispatch.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#EAE4CE] shadow-md border-2 border-white">
              <img
                src={flakyPastriesImg}
                alt="Flaky pastries fresh from the oven"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Section 2: No Occasion Needed */}
        <div className="p-8 sm:p-14 bg-[#20221F] text-[#FAF7EE] rounded-3xl space-y-6 text-center">
          <span className="text-xs uppercase tracking-widest text-[#A7BFA9] font-bold">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7EE] uppercase">
            No Occasion Needed.
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#EAE4CE] italic max-w-xl mx-auto">
            “Birthday? Graduation? Tuesday afternoon? We’ve got you.”
          </p>
          <p className="text-sm sm:text-base text-[#D1D5CE] max-w-2xl mx-auto leading-relaxed">
            For decades, cake was reserved for once-a-year occasions. You had to wear formal clothes and wait for someone to turn 30. We think a random rainy afternoon in Yaba or a long study session in Akoka is reason enough to eat a warm fudgy brownie with flaky sea salt.
          </p>
        </div>

        {/* Story Section 3: Ingredients & Standards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#EAE4CE] shadow-md border-2 border-white">
              <img
                src={fudgeBrowniesImg}
                alt="Fudge brownies made with Belgian chocolate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-5 order-1 md:order-2">
            <span className="text-xs uppercase tracking-widest text-[#5C7461] font-bold">
              02 / The Ingredients
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#20221F]">
              Real butter. No shortcuts.
            </h2>
            <p className="text-sm text-[#4B4E4A] leading-relaxed">
              We never use artificial vanilla flavoring or vegetable shortening. If it’s on our menu, it was made with ingredients you could find in a grandmother's pantry.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#383A37]">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#5C7461] shrink-0" />
                <span>84% European lactic cultured butter for true flaky layers</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#5C7461] shrink-0" />
                <span>Single-origin Callebaut & Valrhona dark chocolates</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#5C7461] shrink-0" />
                <span>Hand-crushed cardamom and Maldon sea salt flakes</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#5C7461] shrink-0" />
                <span>Flat ₦2,500 delivery across Lagos and nationwide</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('/menu')}
                className="px-8 py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center gap-2 shadow-md"
              >
                Explore The Menu <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
