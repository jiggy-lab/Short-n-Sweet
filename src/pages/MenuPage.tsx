import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Clock, Plus } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCategory, ProductMood } from '../types';
import { useCart } from '../context/CartContext';
import { CustomSelect } from '../components/CustomSelect';

interface MenuPageProps {
  onNavigate: (path: string) => void;
  initialMood?: string | null;
}

const QUICK_SEARCH_TAGS = [
  'Brownies',
  'Salted Caramel',
  'Pain au Chocolat',
  'Cupcakes',
  'Treat Box',
  'Cookies',
];

const OCCASION_OPTIONS = [
  { value: 'all', label: 'All Occasions' },
  { value: 'celebrate', label: 'Celebration' },
  { value: 'sweet', label: 'Sweet Craving' },
  { value: 'hungry', label: 'Treat Box / Hungry' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Sort: Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, initialMood }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedMood, setSelectedMood] = useState<ProductMood | 'all'>(
    (initialMood as ProductMood) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    if (initialMood && ['celebrate', 'sweet', 'hungry'].includes(initialMood)) {
      setSelectedMood(initialMood as ProductMood);
    }
  }, [initialMood]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Mood filter
      if (selectedMood !== 'all' && product.mood !== selectedMood) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchIngredients = product.ingredients?.some((i) => i.toLowerCase().includes(query));
        const matchTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        return matchName || matchDesc || matchCategory || matchIngredients || matchTags;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: Bestsellers first
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });
  }, [selectedCategory, selectedMood, searchQuery, sortBy]);

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedMood !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMood('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-8 sm:py-12 md:py-16 text-[#20221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Clean Editorial Header */}
        <div className="max-w-2xl space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20221F]">
            The Menu
          </h1>
          <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
            Fresh batches baked from scratch every morning. Comfort delivered straight to your door.
          </p>
        </div>

        {/* Clean & Seamless Search & Filter Navigation */}
        <div className="space-y-4">
          {/* Search Bar with Instant Clear */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#5C7461] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, fudgy brownies, cookies, morning croissants..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#D1D5CE] rounded-2xl text-sm text-[#20221F] placeholder-[#8E948D] focus:outline-none focus:ring-2 focus:ring-[#383A37] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#717670] hover:text-[#20221F] p-1.5 transition-colors rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick-Search Keyword Suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#717670] scrollbar-none">
            <span className="shrink-0 font-medium text-[11px] uppercase tracking-wider text-[#8E948D]">
              Try:
            </span>
            {QUICK_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#20221F] text-[#FAF7EE] font-semibold'
                    : 'bg-white border border-[#D1D5CE] text-[#4B4E4A] hover:bg-[#FAF7EE] hover:text-[#20221F]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Category Tabs Strip */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#20221F] text-[#FAF7EE] shadow-xs'
                      : 'bg-white border border-[#EAE4CE] text-[#5A5E59] hover:bg-[#FAF7EE] hover:text-[#20221F]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Controls Bar: Counts, Occasion Filter & Sorting */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#717670] border-t border-[#EAE4CE]">
            {/* Count & Fresh Notice */}
            <div className="flex items-center gap-2 font-medium">
              <span className="font-bold text-[#20221F]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'treat' : 'treats'}
              </span>
              <span aria-hidden="true" className="text-[#D1D5CE]">·</span>
              <span className="text-[#5C7461]">Cakes require 2-day booking advance</span>
            </div>

            {/* Custom Dropdown Filters in Site Colors (#FAF7EE, #EAE4CE, #5C7461) */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {/* Occasion / Mood */}
              <div className="flex-1 sm:w-44">
                <CustomSelect
                  title="Filter by Occasion"
                  value={selectedMood}
                  onChange={(val) => setSelectedMood(val as any)}
                  options={OCCASION_OPTIONS}
                />
              </div>

              {/* Sort Order */}
              <div className="flex-1 sm:w-48">
                <CustomSelect
                  title="Sort Treats"
                  value={sortBy}
                  onChange={(val) => setSortBy(val as any)}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>
          </div>

          {/* Active Filter State Summary & Reset */}
          {isFiltered && (
            <div className="pt-2 flex items-center justify-between text-xs text-[#717670] bg-[#FAF7EE] px-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>Active filters:</span>
                {searchQuery && (
                  <span className="font-semibold text-[#20221F] bg-white px-2 py-0.5 rounded-md border border-[#D1D5CE]">
                    "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="font-semibold text-[#20221F] bg-white px-2 py-0.5 rounded-md border border-[#D1D5CE] capitalize">
                    {selectedCategory}
                  </span>
                )}
                {selectedMood !== 'all' && (
                  <span className="font-semibold text-[#20221F] bg-white px-2 py-0.5 rounded-md border border-[#D1D5CE] capitalize">
                    {selectedMood}
                  </span>
                )}
              </div>
              <button
                onClick={resetAllFilters}
                className="text-[#C06E52] hover:underline font-semibold text-xs shrink-0 ml-2"
              >
                Reset all
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/50 border border-[#EAE4CE] rounded-3xl p-8">
            <p className="font-serif text-2xl text-[#5A5E59]">No treats found.</p>
            <p className="text-xs text-[#717670] max-w-sm mx-auto">
              We couldn't find anything matching your search. Try searching for brownies, salted caramel, or croissant.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#383A37] transition-all shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white border border-[#EAE4CE] rounded-2xl overflow-hidden hover:border-[#D1D5CE] hover:shadow-lg transition-all duration-300"
              >
                {/* Product Image Clickable */}
                <div
                  onClick={() => onNavigate(`/product?id=${product.id}`)}
                  className="aspect-[4/3] bg-[#EAE4CE] overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {product.leadTimeDays ? (
                    <span className="absolute top-3 left-3 bg-[#20221F]/90 text-[#FAF7EE] text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#A7BFA9]" />
                      2-Day Notice
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-[#FAF7EE]/90 text-[#3E5142] text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Daily Fresh
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="absolute top-3 right-3 bg-[#5C7461] text-[#FAF7EE] text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#717670] mb-1 font-medium">
                      <span>{product.category}</span>
                      <span className="text-[#5C7461]">{product.servings || 'Made fresh'}</span>
                    </div>

                    <button
                      onClick={() => onNavigate(`/product?id=${product.id}`)}
                      className="font-serif font-bold text-lg sm:text-xl text-[#20221F] text-left hover:text-[#5C7461] transition-colors leading-snug block"
                    >
                      {product.name}
                    </button>

                    <p className="text-xs text-[#5A5E59] mt-2 leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5F0D9] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#8E948D]">Price</p>
                      <p className="font-serif text-lg font-bold text-[#20221F] tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate(`/product?id=${product.id}`)}
                        className="px-3 py-2 text-xs font-medium text-[#4B4E4A] hover:text-[#20221F] transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-4 py-2 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#383A37] transition-all flex items-center gap-1.5 shadow-xs"
                        aria-label={`Add ${product.name} to bag`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
