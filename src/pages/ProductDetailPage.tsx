import React, { useState } from 'react';
import { Clock, Plus, Minus, ArrowLeft, ShieldCheck, Heart, Sparkles, Check, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.isBestseller)).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, customNote);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('/menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B4E4A] hover:text-[#20221F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </button>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery / Product Visual */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#EAE4CE] border-2 border-white shadow-xl relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {product.leadTimeDays ? (
                <div className="absolute top-4 left-4 bg-[#20221F]/90 text-[#FAF7EE] text-xs font-medium tracking-wide uppercase px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A7BFA9]" />
                  <span>2-Day Notice Required</span>
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-[#FAF7EE]/95 text-[#3E5142] text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full backdrop-blur-xs shadow-xs">
                  Baked Fresh Daily
                </div>
              )}
            </div>

            {/* Quick delivery promise banner */}
            <div className="p-4 bg-white/70 border border-[#EAE4CE] rounded-2xl flex items-center gap-3 text-xs text-[#4B4E4A]">
              <Truck className="w-4 h-4 text-[#5C7461] shrink-0" />
              <span>
                <strong>Nationwide delivery:</strong> ₦2,500 flat fee. Packed cold & fresh from our Gbagada bakery.
              </span>
            </div>
          </div>

          {/* Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5C7461] font-semibold mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Gbagada, Lagos</span>
                {product.isBestseller && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#C06E52]">Bestseller</span>
                  </>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20221F] leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 flex items-baseline gap-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#20221F] tabular-nums">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.servings && (
                  <span className="text-xs text-[#717670] font-medium">
                    Serves: {product.servings}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
              {product.description}
            </p>

            {/* Cake Notice Callout */}
            {product.leadTimeDays ? (
              <div className="p-4 bg-[#F5F0D9] border border-[#DFD7BC] rounded-2xl space-y-1 text-xs text-[#383A37]">
                <p className="font-bold flex items-center gap-1.5 text-[#20221F]">
                  <Clock className="w-4 h-4 text-[#5C7461]" />
                  Advance Booking Notice
                </p>
                <p>
                  To allow our bakers time to hand-sponge and chill each layer, this cake must be booked at least <strong>2 days in advance</strong>. You can choose your target delivery date at checkout.
                </p>
              </div>
            ) : null}

            {/* Inscription / Custom Note Field */}
            <div className="space-y-2">
              <label htmlFor="custom-note" className="block text-xs font-semibold uppercase tracking-wider text-[#383A37]">
                Piped Message or Gift Note (Optional)
              </label>
              <input
                id="custom-note"
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Tolu! or To my favourite human"
                maxLength={80}
                className="w-full px-4 py-2.5 bg-white border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] placeholder-[#8E948D] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
              />
              <span className="text-[10px] text-[#717670] block">Max 80 characters</span>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center justify-between border border-[#D1D5CE] rounded-full bg-white px-3 py-2 w-full sm:w-36 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#4B4E4A] hover:text-[#20221F] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm tabular-nums text-[#20221F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#4B4E4A] hover:text-[#20221F] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? 'bg-[#4A614F] text-[#FAF7EE]'
                    : 'bg-[#20221F] text-[#FAF7EE] hover:bg-[#383A37]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <span>
                    Add to Bag · ₦{(product.price * quantity).toLocaleString()}
                  </span>
                )}
              </button>
            </div>

            {/* Ingredients & Tasting Info */}
            <div className="pt-6 border-t border-[#EAE4CE] space-y-4 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#20221F] mb-1.5">
                  Key Ingredients
                </h4>
                <p className="text-[#5A5E59] leading-relaxed">
                  {product.ingredients?.join(', ') || 'Fresh daily ingredients'}
                </p>
              </div>

              {product.allergens && (
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[#20221F] mb-1.5">
                    Allergen Information
                  </h4>
                  <p className="text-[#5A5E59]">
                    Contains: {product.allergens.join(', ')}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#20221F] mb-1.5">
                  Storage & Freshness
                </h4>
                <p className="text-[#5A5E59] leading-relaxed">
                  Best enjoyed within 3–4 days. Store in an airtight container or refrigerate in warmer Lagos afternoons. Bring to room temperature 30 minutes before serving for maximum flavor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Treats Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-14 border-t border-[#EAE4CE]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold mb-1">
                  Pairs Nicely With
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#20221F]">
                  More from the oven.
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/menu')}
                className="text-xs font-semibold uppercase tracking-wider text-[#20221F] hover:text-[#5C7461]"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onNavigate(`/product?id=${rel.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white border border-[#EAE4CE] rounded-2xl overflow-hidden cursor-pointer hover:border-[#D1D5CE] hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] bg-[#EAE4CE] overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-base text-[#20221F] group-hover:text-[#5C7461]">
                        {rel.name}
                      </h4>
                      <span className="font-serif font-bold text-sm text-[#20221F] tabular-nums">
                        ₦{rel.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#717670] line-clamp-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
