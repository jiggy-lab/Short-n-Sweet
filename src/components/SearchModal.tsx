import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Plus, Sparkles, Clock, Check, TrendingUp } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const TRENDING_TAGS = [
  'Salted Caramel Cake',
  'Maldon Sea Salt Brownies',
  'Morning Pastry Duo',
  'Treat Box',
  'Chocolate Chunk Cookies',
  'Red Velvet Cupcakes',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter matching products
  const trimmed = query.trim().toLowerCase();
  const matchingProducts = trimmed
    ? PRODUCTS.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCategory = p.category.toLowerCase().includes(trimmed);
        const matchDesc = p.description.toLowerCase().includes(trimmed);
        const matchIngredients = p.ingredients?.some((i) => i.toLowerCase().includes(trimmed));
        const matchTags = p.tags?.some((t) => t.toLowerCase().includes(trimmed));
        return matchName || matchCategory || matchDesc || matchIngredients || matchTags;
      })
    : [];

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 3);

  const handleProductSelect = (productId: string) => {
    onClose();
    onNavigate(`/product?id=${productId}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    onClose();
    onNavigate(categoryId === 'all' ? '/menu' : `/menu`);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingProducts.length === 1) {
        handleProductSelect(matchingProducts[0].id);
      } else if (trimmed) {
        onClose();
        onNavigate(`/menu`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#20221F]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Dialog Frame */}
      <div className="min-h-full flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#FAF7EE] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EAE4CE] overflow-hidden text-[#20221F] animate-slideDown"
        >
          {/* Top Bar: Search Input */}
          <div className="p-4 sm:p-6 border-b border-[#EAE4CE] bg-white/70">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#5C7461] absolute left-4 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Search treats, flavors, pastries..."
                className="w-full pl-12 pr-12 py-3.5 bg-[#FAF7EE] border border-[#D1D5CE] rounded-2xl text-sm sm:text-base text-[#20221F] placeholder-[#8E948D] focus:outline-none focus:ring-2 focus:ring-[#383A37] transition-all"
              />
              {query ? (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3.5 p-1.5 text-[#717670] hover:text-[#20221F] transition-colors rounded-full"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="absolute right-3.5 p-1.5 text-[#717670] hover:text-[#20221F] transition-colors rounded-full"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Content Area */}
          <div className="p-4 sm:p-6 max-h-[68vh] overflow-y-auto space-y-6">
            {/* STATE 1: Live Results when query is entered */}
            {query.trim() !== '' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#717670]">
                  <span>
                    Found <strong className="text-[#20221F]">{matchingProducts.length}</strong> {matchingProducts.length === 1 ? 'treat' : 'treats'} for "{query}"
                  </span>
                  {matchingProducts.length > 0 && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('/menu');
                      }}
                      className="text-[#5C7461] hover:underline font-semibold"
                    >
                      View on menu →
                    </button>
                  )}
                </div>

                {matchingProducts.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <p className="font-serif text-xl text-[#5A5E59]">
                      No sweet treats found for "{query}"
                    </p>
                    <p className="text-xs text-[#717670] max-w-xs mx-auto">
                      Try searching for brownies, salted caramel, croissants, or select one of our popular bakes below.
                    </p>
                    <button
                      onClick={() => setQuery('')}
                      className="px-5 py-2 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#383A37] transition-all mt-2"
                    >
                      Reset Search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {matchingProducts.map((p) => {
                      const isAdded = addedId === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleProductSelect(p.id)}
                          className="group p-3 bg-white hover:bg-[#F5F0D9] border border-[#EAE4CE] rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 shadow-2xs hover:border-[#D1D5CE]"
                        >
                          {/* Image & Title */}
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-14 h-14 object-cover rounded-xl bg-[#EAE4CE] shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C7461]">
                                  {p.category}
                                </span>
                                {p.leadTimeDays ? (
                                  <span className="text-[9px] uppercase font-semibold text-[#8E948D] flex items-center gap-0.5">
                                    <Clock className="w-2.5 h-2.5" /> 2-Day Notice
                                  </span>
                                ) : null}
                              </div>
                              <h4 className="font-serif font-bold text-sm text-[#20221F] group-hover:text-[#5C7461] transition-colors truncate">
                                {p.name}
                              </h4>
                              <p className="text-xs font-semibold text-[#20221F] tabular-nums mt-0.5">
                                ₦{p.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Quick Add Button */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={(e) => handleQuickAdd(e, p)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shadow-2xs ${
                                isAdded
                                  ? 'bg-[#4A614F] text-[#FAF7EE]'
                                  : 'bg-[#20221F] text-[#FAF7EE] hover:bg-[#383A37]'
                              }`}
                              title={`Add ${p.name} to bag`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                            <ArrowRight className="w-4 h-4 text-[#8E948D] group-hover:text-[#20221F] group-hover:translate-x-0.5 transition-all hidden sm:block" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* STATE 2: Empty Query - Rich, Interactive Discovery */
              <div className="space-y-6">
                {/* 1. Trending / Quick Suggestions */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#717670] mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-[#5C7461]" />
                    <span>Trending Cravings</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 bg-white border border-[#D1D5CE] hover:border-[#20221F] hover:bg-[#FAF7EE] text-[#383A37] hover:text-[#20221F] rounded-full text-xs font-medium transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Quick Category Exploration */}
                <div className="pt-2 border-t border-[#F5F0D9]">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#717670] mb-3">
                    <span>Browse By Category</span>
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className="text-[#5C7461] hover:underline capitalize"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="p-3 bg-white border border-[#EAE4CE] hover:border-[#D1D5CE] hover:bg-[#F5F0D9] rounded-2xl text-left transition-all group"
                      >
                        <span className="font-serif font-bold text-xs text-[#20221F] group-hover:text-[#5C7461] block">
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-[#717670]">
                          Explore batch →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Today's Fresh Bestsellers (Instant Add) */}
                <div className="pt-2 border-t border-[#F5F0D9]">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#717670] mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#5C7461]" />
                    <span>Popular Today</span>
                  </div>
                  <div className="space-y-2.5">
                    {bestsellers.map((item) => {
                      const isAdded = addedId === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleProductSelect(item.id)}
                          className="p-2.5 bg-white hover:bg-[#F5F0D9] border border-[#EAE4CE] rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover bg-[#EAE4CE] shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-serif font-bold text-xs text-[#20221F] truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] font-semibold text-[#5C7461] tabular-nums">
                                ₦{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleQuickAdd(e, item)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                              isAdded
                                ? 'bg-[#4A614F] text-[#FAF7EE]'
                                : 'bg-[#20221F] text-[#FAF7EE] hover:bg-[#383A37]'
                            }`}
                          >
                            {isAdded ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Bar */}
          <div className="px-5 py-3.5 bg-[#FAF7EE] border-t border-[#EAE4CE] flex items-center justify-between text-xs text-[#717670]">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-white border border-[#D1D5CE] rounded text-[10px] font-mono">ESC</kbd> to exit</span>
            <button
              onClick={() => {
                onClose();
                onNavigate('/menu');
              }}
              className="text-[#20221F] font-bold hover:underline inline-flex items-center gap-1 ml-auto"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
