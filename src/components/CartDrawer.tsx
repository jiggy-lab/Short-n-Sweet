import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    hasCakes,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    onNavigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-[#20221F]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7EE] text-[#20221F] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EAE4CE] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight">
                Your Bag
              </h2>
              <p className="text-xs text-[#717670]">
                {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} sweet treats selected`}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#4B4E4A] hover:text-[#20221F] hover:bg-[#F5F0D9] rounded-full transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lead time warning banner */}
          {hasCakes && (
            <div className="bg-[#E7EDE8] border-b border-[#D1D5CE] px-6 py-2.5 flex items-center gap-2.5 text-xs text-[#3E5142]">
              <Clock className="w-4 h-4 shrink-0 text-[#5C7461]" />
              <span>Cakes are baked to order and require at least 2 days notice.</span>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <p className="font-serif text-lg text-[#5A5E59]">
                  Your bag is looking a little empty.
                </p>
                <p className="text-xs text-[#717670] max-w-xs mx-auto">
                  A Tuesday afternoon brownie or weekend celebration cake is only a click away.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('/menu');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#383A37] transition-all"
                >
                  Explore the Menu <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white/70 border border-[#EAE4CE] rounded-xl hover:border-[#D1D5CE] transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg shrink-0 bg-[#F5F0D9]"
                    loading="lazy"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-[#20221F] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#8E948D] hover:text-[#C06E52] transition-colors p-1"
                          title="Remove item"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-[#5C7461] tabular-nums mt-0.5">
                        ₦{item.product.price.toLocaleString()}
                      </p>
                      {item.customNote && (
                        <p className="text-[11px] text-[#717670] italic line-clamp-1 mt-0.5">
                          "{item.customNote}"
                        </p>
                      )}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F0D9]">
                      <div className="flex items-center border border-[#D1D5CE] rounded-lg bg-[#FAF7EE] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#4B4E4A] hover:bg-[#EAE4CE] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-[#20221F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#4B4E4A] hover:bg-[#EAE4CE] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold tabular-nums text-[#20221F]">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE4CE] bg-[#FAF7EE] space-y-4">
              <div className="space-y-1.5 text-xs text-[#4B4E4A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#20221F]">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Flat Delivery</span>
                  <span className="tabular-nums font-medium text-[#20221F]">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#20221F] pt-2 border-t border-[#EAE4CE]">
                  <span>Total</span>
                  <span className="tabular-nums font-serif text-base text-[#20221F]">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#383A37] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Proceed to Checkout · ₦{total.toLocaleString()}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 bg-transparent border border-[#20221F] text-[#20221F] rounded-full text-xs font-medium tracking-wide uppercase hover:bg-[#F5F0D9] transition-all"
                >
                  View Bag Details & Notes
                </button>
              </div>

              <p className="text-[11px] text-center text-[#717670]">
                Deliveries dispatch daily from Gbagada, Lagos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
