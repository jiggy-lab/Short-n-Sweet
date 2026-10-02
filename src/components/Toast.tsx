import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="bg-[#20221F] text-[#FAF7EE] px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#383A37] max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[#7A937F] shrink-0" />
        <span className="text-xs font-medium leading-snug">{toastMessage}</span>
        <button
          onClick={dismissToast}
          className="text-[#8E948D] hover:text-[#FAF7EE] p-1 transition-colors ml-auto"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
