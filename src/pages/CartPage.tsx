import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    hasCakes,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7EE] min-h-[70vh] py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-[#EAE4CE] text-[#383A37] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#20221F]">
            Your bag is looking a little empty.
          </h1>
          <p className="text-sm text-[#4B4E4A] leading-relaxed">
            Our Gbagada ovens are fired up and ready. Treat yourself to a warm fudgy brownie, freshly baked pastries, or a celebration cake.
          </p>
          <div>
            <button
              onClick={() => onNavigate('/menu')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all shadow-md"
            >
              Explore the Menu <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#EAE4CE] mb-10 gap-4">
          <div>
            <button
              onClick={() => onNavigate('/menu')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B4E4A] hover:text-[#20221F] transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#20221F]">
              Your Sweet Bag
            </h1>
          </div>
          <p className="text-xs text-[#717670]">
            {cart.reduce((s, i) => s + i.quantity, 0)} items · Flat ₦2,500 delivery nationwide
          </p>
        </div>

        {/* Cake Notice Callout */}
        {hasCakes && (
          <div className="mb-8 p-4 bg-[#E7EDE8] border border-[#D1D5CE] rounded-2xl flex items-center gap-3 text-xs text-[#3E5142]">
            <Clock className="w-4 h-4 text-[#5C7461] shrink-0" />
            <span>
              <strong>Note on cakes:</strong> Your bag contains handcrafted cakes which require at least <strong>2 days advance notice</strong> for baking and decoration.
            </span>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-[#EAE4CE] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xs"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onClick={() => onNavigate(`/product?id=${item.product.id}`)}
                  className="w-24 h-24 object-cover rounded-xl bg-[#EAE4CE] cursor-pointer shrink-0"
                />

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#5C7461] font-semibold">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => onNavigate(`/product?id=${item.product.id}`)}
                        className="font-serif font-bold text-lg text-[#20221F] hover:text-[#5C7461] cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#8E948D] hover:text-[#C06E52] p-1.5 transition-colors"
                      title="Remove item"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[#5C7461] tabular-nums">
                    ₦{item.product.price.toLocaleString()} each
                  </p>

                  {item.customNote && (
                    <p className="text-xs text-[#717670] italic pt-1">
                      Note: "{item.customNote}"
                    </p>
                  )}
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F5F0D9]">
                  <div className="flex items-center border border-[#D1D5CE] rounded-full bg-[#FAF7EE] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-[#4B4E4A] hover:bg-[#EAE4CE] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold tabular-nums text-[#20221F]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-[#4B4E4A] hover:bg-[#EAE4CE] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-serif font-bold text-base text-[#20221F] tabular-nums">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#EAE4CE] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#20221F] pb-4 border-b border-[#F5F0D9]">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-[#4B4E4A]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#20221F] tabular-nums">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Delivery Fee</span>
                  <span className="font-semibold text-[#20221F] tabular-nums">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#F5F0D9] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#20221F]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#20221F] tabular-nums">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onNavigate('/checkout')}
                  className="w-full py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-[#717670]">
                  Visual simulated checkout with Bank Transfer, Mastercard & Verve
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
