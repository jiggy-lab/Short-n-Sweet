import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export interface Option<T> {
  value: T;
  label: string;
}

interface CustomSelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  className?: string;
  title?: string;
}

export function CustomSelect<T extends string>({
  value,
  onChange,
  options,
  className = '',
  title,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button styled with site cream & charcoal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white hover:bg-[#FAF7EE] border border-[#D1D5CE] hover:border-[#20221F] rounded-xl px-3 py-2 text-xs font-semibold text-[#20221F] flex items-center justify-between gap-2 shadow-2xs transition-all cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#5C7461] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Bespoke Bakery Popover / Sheet in Site Colors (#FAF7EE, #EAE4CE, #20221F, #5C7461) */}
      {isOpen && (
        <>
          {/* Mobile backdrop for high-end touch feel */}
          <div
            className="fixed inset-0 z-40 bg-[#20221F]/30 backdrop-blur-2xs sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed sm:absolute bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 top-auto sm:top-full sm:mt-1.5 z-50 w-full sm:w-56 bg-[#FAF7EE] border-t sm:border border-[#EAE4CE] rounded-t-3xl sm:rounded-2xl shadow-2xl p-3 sm:p-2 animate-slideDown">
            {/* Mobile Header indicator */}
            <div className="flex sm:hidden items-center justify-between pb-2 mb-2 border-b border-[#EAE4CE]">
              <span className="font-serif font-bold text-sm text-[#20221F]">
                {title || 'Select Option'}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#717670] hover:text-[#20221F] rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-1.5 sm:space-y-1 max-h-[50vh] sm:max-h-60 overflow-y-auto">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 sm:py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E7EDE8] text-[#20221F] font-bold shadow-2xs'
                        : 'text-[#4B4E4A] hover:bg-white hover:text-[#20221F]'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{opt.label}</span>
                    {/* Site-colored check radio circle: Warm Sage Green #5C7461 */}
                    <div
                      className={`w-5 h-5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#5C7461] text-white shadow-2xs'
                          : 'border-2 border-[#D1D5CE] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 sm:w-2.5 sm:h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
