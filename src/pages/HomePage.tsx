import React from 'react';
import { ArrowRight, Clock, Sparkles, Heart, Check, Package, Coffee } from 'lucide-react';
import { PRODUCTS, MOODS } from '../data/products';
import { useCart } from '../context/CartContext';
import {
  heroCenterpieceImg,
  customCelebrationCakeImg,
  flakyPastriesImg,
  fudgeBrowniesImg,
  chocolateCookiesImg,
  velvetCupcakesImg
} from '../data/products';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="bg-[#FAF7EE] text-[#20221F]">
      {/* SECTION 3 — EDITORIAL HERO */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 md:pt-16 md:pb-24 border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Typography & Intent */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
                <span>Artisanal Bakery</span>
                <span aria-hidden="true">·</span>
                <span>Gbagada, Lagos</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-[#20221F] tracking-tight leading-[1.08] text-balance">
                Comfort in every single bite.
              </h1>

              <p className="text-base sm:text-lg text-[#4B4E4A] leading-relaxed max-w-lg">
                Handcrafted cakes, morning pastries, and little treats — baked fresh daily in Gbagada and delivered across Lagos & nationwide. No occasion required.
              </p>

              {/* Action buttons: Single clean primary button + quiet secondary text link */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <button
                  onClick={() => onNavigate('/menu')}
                  className="px-7 py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#383A37] transition-all flex items-center justify-center gap-2.5 shadow-sm group"
                >
                  <span>Shop the Menu</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#383A37] hover:text-[#5C7461] transition-colors py-2 underline underline-offset-4 decoration-[#D1D5CE] hover:decoration-[#5C7461]"
                >
                  Order a Custom Cake →
                </button>
              </div>

              {/* Clean Editorial Category Line (Inspired by Keshobi's) */}
              <div className="pt-4 border-t border-[#EAE4CE] flex items-center gap-3 sm:gap-6 text-xs text-[#717670] flex-wrap font-medium">
                <span>Celebration Cakes</span>
                <span aria-hidden="true" className="text-[#A7BFA9]">·</span>
                <span>Flaky Pastries</span>
                <span aria-hidden="true" className="text-[#A7BFA9]">·</span>
                <span>Fudgy Brownies</span>
                <span aria-hidden="true" className="text-[#A7BFA9]">·</span>
                <span>Treat Boxes</span>
              </div>
            </div>

            {/* Right Column: Tactile Centerpiece Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Clean arch frame background with soft shadow */}
                <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white/90 bg-[#EAE4CE]">
                  <img
                    src={heroCenterpieceImg}
                    alt="Handcrafted layered vanilla drip cake with fresh strawberries and blackberries on a marble pedestal stand"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                </div>

                {/* Editorial floating note badge */}
                <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#FAF7EE] border border-[#EAE4CE] rounded-xl p-3 shadow-md max-w-[200px] hidden sm:block">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5C7461] font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Daily Morning Pull</span>
                  </div>
                  <p className="font-serif text-xs font-bold text-[#20221F] mt-0.5">
                    Fresh Belgian Chocolate Gâteau
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BEST SELLERS */}
      <section className="py-16 md:py-24 border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold mb-2">
                01 / The Good Stuff
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20221F]">
                What everyone’s ordering.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/menu')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20221F] hover:text-[#5C7461] transition-colors group"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white/60 border border-[#EAE4CE] rounded-2xl overflow-hidden hover:border-[#D1D5CE] hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container with clickable view */}
                <div
                  onClick={() => onNavigate(`/product?id=${product.id}`)}
                  className="aspect-[4/3] bg-[#EAE4CE] overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {product.leadTimeDays ? (
                    <span className="absolute top-3 left-3 bg-[#20221F]/90 text-[#FAF7EE] text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      2-Day Notice
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-[#FAF7EE]/90 text-[#3E5142] text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Daily Fresh
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#717670] mb-1.5 font-medium">
                      <span>{product.category}</span>
                      <span className="text-[#5C7461]">Gbagada Kitchen</span>
                    </div>
                    <button
                      onClick={() => onNavigate(`/product?id=${product.id}`)}
                      className="font-serif font-bold text-lg text-[#20221F] text-left hover:text-[#5C7461] transition-colors leading-snug block"
                    >
                      {product.name}
                    </button>
                    <p className="text-xs text-[#5A5E59] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F5F0D9] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#8E948D]">Price</p>
                      <p className="font-serif text-base font-bold text-[#20221F] tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#383A37] transition-all shadow-xs"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — TYPOGRAPHIC BRAND STATEMENT: NO OCCASION NEEDED */}
      <section className="py-20 md:py-28 bg-[#20221F] text-[#FAF7EE] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-xs uppercase tracking-widest text-[#A7BFA9] font-semibold">
            Our Central Rule
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF7EE] uppercase leading-[1.05]">
            No Occasion Needed.
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-[#EAE4CE] italic max-w-2xl mx-auto">
            “Birthday? Graduation? Tuesday? Whatever the reason — or lack of one — Short n’ Sweet is there.”
          </p>

          <p className="text-sm sm:text-base text-[#D1D5CE] max-w-xl mx-auto leading-relaxed">
            You do not have to wait for someone to turn 30 or get promoted to order a slice of good cake. We bake comfort whenever you need it.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('/menu')}
              className="px-8 py-3.5 bg-[#FAF7EE] text-[#20221F] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#EAE4CE] transition-all shadow-md"
            >
              Order For Today
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SHOP BY MOOD */}
      <section className="py-16 md:py-24 border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
              Curated Selection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20221F]">
              What are we feeling?
            </h2>
            <p className="text-sm text-[#4B4E4A]">
              Match your craving to our fresh oven batches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOODS.map((mood) => {
              const moodImages: Record<string, string> = {
                celebrate: customCelebrationCakeImg,
                sweet: chocolateCookiesImg,
                hungry: flakyPastriesImg,
              };

              return (
                <div
                  key={mood.id}
                  onClick={() => onNavigate(`/menu?mood=${mood.id}`)}
                  className="group relative cursor-pointer bg-white/70 border border-[#EAE4CE] rounded-3xl overflow-hidden hover:border-[#D1D5CE] hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#EAE4CE]">
                    <img
                      src={moodImages[mood.id]}
                      alt={mood.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#5C7461] font-bold block mb-1">
                        {mood.tag}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#20221F] group-hover:text-[#5C7461] transition-colors">
                        {mood.label}
                      </h3>
                      <p className="text-xs text-[#5A5E59] mt-2 leading-relaxed">
                        {mood.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F5F0D9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#20221F] group-hover:text-[#5C7461]">
                      <span>Browse Treats</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CUSTOM CAKES (EDITORIAL) */}
      <section className="py-16 md:py-24 bg-[#F5F0D9] border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white/90 aspect-[4/3] bg-[#EAE4CE]">
                <img
                  src={customCelebrationCakeImg}
                  alt="Custom bespoke ivory celebration cake with figs, berries, and gold leaf"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
                Custom Baking & Celebrations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#20221F] leading-tight">
                Made for your moment.
              </h2>
              <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
                Whether it is an intimate wedding in Ikoyi, a milestone birthday in Gbagada, or a graduation surprise across Lagos, we craft bespoke buttercream cakes with thoughtful flavour pairings.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#383A37]">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <span><strong>2-day advance notice:</strong> Every cake is baked from scratch to ensure peak tenderness.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <span><strong>Personalized piping:</strong> Add custom birthday messages and hand-written gift cards.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <span><strong>Safe chilled dispatch:</strong> Handled carefully by trained pastry dispatch riders.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-8 py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center gap-3 shadow-md"
                >
                  Order a Custom Cake
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section className="py-16 md:py-24 border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
              The Process
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#20221F]">
              How it works.
            </h2>
            <p className="text-xs sm:text-sm text-[#717670]">
              From our Gbagada ovens to your doorstep in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white/60 border border-[#EAE4CE] rounded-2xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#A7BFA9]">01</span>
              <h4 className="font-serif text-lg font-bold text-[#20221F]">Pick</h4>
              <p className="text-xs text-[#5A5E59] leading-relaxed">
                Choose what you're craving from our rotating menu of cakes, pastries, cookies, and boxes.
              </p>
            </div>

            <div className="p-6 bg-white/60 border border-[#EAE4CE] rounded-2xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#A7BFA9]">02</span>
              <h4 className="font-serif text-lg font-bold text-[#20221F]">Order</h4>
              <p className="text-xs text-[#5A5E59] leading-relaxed">
                Tell us where to send it in Lagos or nationwide with flat ₦2,500 delivery fee.
              </p>
            </div>

            <div className="p-6 bg-white/60 border border-[#EAE4CE] rounded-2xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#A7BFA9]">03</span>
              <h4 className="font-serif text-lg font-bold text-[#20221F]">Bake</h4>
              <p className="text-xs text-[#5A5E59] leading-relaxed">
                We make it fresh with European butter, Belgian cocoa, and zero shortcuts.
              </p>
            </div>

            <div className="p-6 bg-white/60 border border-[#EAE4CE] rounded-2xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#A7BFA9]">04</span>
              <h4 className="font-serif text-lg font-bold text-[#20221F]">Enjoy</h4>
              <p className="text-xs text-[#5A5E59] leading-relaxed">
                Your sweet thing arrives boxed and ribboned. Take your time and savour every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-[#FAF7EE] border-b border-[#EAE4CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold mb-2">
              Words From The Sweet Tooth Club
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#20221F]">
              Real people, real cravings.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#EAE4CE] rounded-2xl space-y-4 shadow-xs">
              <p className="font-serif text-lg text-[#20221F] italic leading-snug">
                “Ordered for my sister’s birthday and somehow ended up eating half of it myself before she got back from work.”
              </p>
              <div className="pt-2 border-t border-[#F5F0D9] text-xs text-[#717670]">
                <p className="font-bold text-[#20221F]">Titi A.</p>
                <p>Gbagada Phase 2, Lagos</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#EAE4CE] rounded-2xl space-y-4 shadow-xs">
              <p className="font-serif text-lg text-[#20221F] italic leading-snug">
                “The brownies arrived still slightly warm to my office in Victoria Island. Officially my Tuesday ritual now.”
              </p>
              <div className="pt-2 border-t border-[#F5F0D9] text-xs text-[#717670]">
                <p className="font-bold text-[#20221F]">Chukwuemeka O.</p>
                <p>Victoria Island, Lagos</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#EAE4CE] rounded-2xl space-y-4 shadow-xs">
              <p className="font-serif text-lg text-[#20221F] italic leading-snug">
                “Finally a bakery in Lagos that understands flaky pastry layers instead of dense bread pretending to be a croissant.”
              </p>
              <div className="pt-2 border-t border-[#F5F0D9] text-xs text-[#717670]">
                <p className="font-bold text-[#20221F]">Zainab B.</p>
                <p>Ikeja GRA, Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — VISUAL SOCIAL / BAKERY MOMENTS */}
      <section className="py-16 md:py-20 border-b border-[#EAE4CE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold mb-1">
              @shortnsweet.ng
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#20221F]">
              Daily scenes from Gbagada.
            </h3>
          </div>
          <span className="text-xs text-[#717670] hidden sm:inline">
            Follow our morning oven pulls
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE4CE]">
              <img
                src={flakyPastriesImg}
                alt="Flaky morning pastries"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE4CE]">
              <img
                src={fudgeBrowniesImg}
                alt="Fudge sea salt brownies stack"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE4CE]">
              <img
                src={velvetCupcakesImg}
                alt="Velvet swirl cupcakes box"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE4CE]">
              <img
                src={chocolateCookiesImg}
                alt="Chocolate chunk sea salt cookies"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 bg-[#FAF7EE] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
            Ready when you are
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#20221F]">
            Something sweet is waiting.
          </h2>
          <p className="text-base text-[#4B4E4A] max-w-md mx-auto">
            Fresh batches coming out of our Gbagada ovens right now. Treat yourself or send a surprise.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('/menu')}
              className="px-10 py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all shadow-lg flex items-center gap-3 mx-auto"
            >
              Shop the Menu
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
