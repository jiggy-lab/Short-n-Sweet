import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Loader2, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { PaymentMethod, DeliveryDetails } from '../types';
import { NIGERIAN_STATES } from '../data/products';
import { MastercardIcon, VisaIcon, VerveIcon, BankTransferIcon } from '../components/PaymentIcons';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, subtotal, deliveryFee, total, hasCakes, clearCart } = useCart();
  const { createOrder } = useOrders();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Gbagada Phase 2');
  const [state, setState] = useState('Lagos (Mainland)');
  
  // Calculate minimum date: today + 2 days if cakes are in cart, otherwise tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + (hasCakes ? 2 : 1));
  const minDateString = minDate.toISOString().split('T')[0];

  const [deliveryDate, setDeliveryDate] = useState(minDateString);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');

  // Simulated card details for visual UI
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7EE] min-h-[70vh] py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <h1 className="font-serif text-3xl font-bold text-[#20221F]">
            No items to checkout.
          </h1>
          <p className="text-sm text-[#4B4E4A]">
            Add some sweet treats from our menu to begin your order.
          </p>
          <button
            onClick={() => onNavigate('/menu')}
            className="px-8 py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all"
          >
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (minimum 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address for your order confirmation';
    }

    const phoneRegex = /^[0-9+() -]{10,15}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      errs.phone = 'Please provide a valid Nigerian contact number (e.g. +234 812 345 6789)';
    }

    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'Please specify a clear delivery street address in Lagos or nationwide';
    }

    if (!deliveryDate) {
      errs.deliveryDate = 'Please select a delivery date';
    } else if (hasCakes) {
      const selected = new Date(deliveryDate);
      const minRequired = new Date(minDateString);
      if (selected < minRequired) {
        errs.deliveryDate = 'Cakes require at least 2 days advance notice from today';
      }
    }

    if (paymentMethod === 'mastercard' || paymentMethod === 'visa' || paymentMethod === 'verve') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        errs.cardNumber = 'Please enter a 16-digit simulated card number';
      }
      if (!cardExpiry) {
        errs.cardExpiry = 'MM/YY required';
      }
      if (!cardCvv || cardCvv.length < 3) {
        errs.cardCvv = 'CVV required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setProcessingStep('Authorizing simulated checkout...');

    setTimeout(() => {
      setProcessingStep('Verifying dispatch availability in Gbagada...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Generating sweet order receipt...');
    }, 2000);

    setTimeout(() => {
      const customerData: DeliveryDetails = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        area: area.trim(),
        state,
        deliveryDate,
        deliveryNote: deliveryNote.trim(),
      };

      const newOrder = createOrder(
        customerData,
        paymentMethod,
        cart,
        subtotal,
        deliveryFee,
        total
      );

      clearCart();
      setIsProcessing(false);
      onNavigate(`/confirmation?orderId=${newOrder.id}`);
    }, 3000);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => onNavigate('/cart')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B4E4A] hover:text-[#20221F] transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#20221F]">
            Checkout & Delivery
          </h1>
          <p className="text-xs text-[#717670] mt-1">
            Simulated payment checkout · Flat ₦2,500 nationwide delivery
          </p>
        </div>

        {/* Cake Notice Callout */}
        {hasCakes && (
          <div className="mb-8 p-4 bg-[#E7EDE8] border border-[#D1D5CE] rounded-2xl flex items-center gap-3 text-xs text-[#3E5142]">
            <Clock className="w-4 h-4 text-[#5C7461] shrink-0" />
            <span>
              Your order contains celebratory cakes. The earliest available delivery slot is set to <strong>{minDateString}</strong> (2-day advance notice).
            </span>
          </div>
        )}

        {/* Processing Modal Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 bg-[#20221F]/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF7EE] text-[#20221F] rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-[#EAE4CE]">
              <Loader2 className="w-12 h-12 text-[#5C7461] animate-spin mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#20221F]">
                Processing Order
              </h3>
              <p className="text-xs text-[#5A5E59] animate-pulse font-medium">
                {processingStep}
              </p>
              <div className="pt-2 text-[11px] text-[#717670]">
                Simulation mode · No real funds will be charged
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Delivery & Contact details */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Contact Information */}
              <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#20221F]">
                  1. Contact Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Feranmi Adesegun"
                      className={`w-full px-4 py-3 bg-[#FAF7EE] border rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37] ${
                        errors.fullName ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#C06E52] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-3 bg-[#FAF7EE] border rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37] ${
                          errors.email ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#C06E52] mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 812 345 6789"
                        className={`w-full px-4 py-3 bg-[#FAF7EE] border rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37] ${
                          errors.phone ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-[#C06E52] mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#20221F]">
                  2. Delivery Address (Nationwide)
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                      Street Address & Apartment / Estate *
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 14 Diya Street, Behind Zenith Bank, Gbagada"
                      className={`w-full px-4 py-3 bg-[#FAF7EE] border rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37] ${
                        errors.address ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#C06E52] mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Neighborhood / City Area
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Gbagada / Lekki / Ikeja"
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Preferred Delivery Date *
                      </label>
                      <input
                        type="date"
                        min={minDateString}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className={`w-full px-4 py-3 bg-[#FAF7EE] border rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37] ${
                          errors.deliveryDate ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                        }`}
                      />
                      {errors.deliveryDate && (
                        <p className="text-[11px] text-[#C06E52] mt-1">{errors.deliveryDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        placeholder="e.g. Call upon arrival, leave with security"
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method Simulation */}
              <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-[#20221F]">
                    3. Payment Method (Simulated)
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C7461] bg-[#E7EDE8] px-2.5 py-1 rounded-full">
                    Demo Mode
                  </span>
                </div>

                <p className="text-xs text-[#717670]">
                  This is a portfolio simulation project. Choose your payment method below. No real funds will ever be deducted.
                </p>

                {/* Payment Method Selector Tabs with Official Institution Logos */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#20221F] bg-[#FAF7EE] font-bold text-[#20221F] shadow-xs'
                        : 'border-[#EAE4CE] bg-white text-[#5A5E59] hover:bg-[#F5F0D9]'
                    }`}
                  >
                    <BankTransferIcon className="h-6 w-auto" />
                    <span className="text-xs">Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mastercard')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'mastercard'
                        ? 'border-[#20221F] bg-[#FAF7EE] font-bold text-[#20221F] shadow-xs'
                        : 'border-[#EAE4CE] bg-white text-[#5A5E59] hover:bg-[#F5F0D9]'
                    }`}
                  >
                    <MastercardIcon className="h-6 w-auto" />
                    <span className="text-xs">Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('visa')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'visa'
                        ? 'border-[#20221F] bg-[#FAF7EE] font-bold text-[#20221F] shadow-xs'
                        : 'border-[#EAE4CE] bg-white text-[#5A5E59] hover:bg-[#F5F0D9]'
                    }`}
                  >
                    <VisaIcon className="h-6 w-auto" />
                    <span className="text-xs">Visa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('verve')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'verve'
                        ? 'border-[#20221F] bg-[#FAF7EE] font-bold text-[#20221F] shadow-xs'
                        : 'border-[#EAE4CE] bg-white text-[#5A5E59] hover:bg-[#F5F0D9]'
                    }`}
                  >
                    <VerveIcon className="h-6 w-auto" />
                    <span className="text-xs">Verve</span>
                  </button>
                </div>

                {/* Method Specific Display */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 bg-[#FAF7EE] border border-[#EAE4CE] rounded-2xl space-y-2 text-xs text-[#383A37]">
                    <p className="font-bold text-[#20221F]">
                      Simulated Bank Transfer Instructions:
                    </p>
                    <div className="space-y-1 text-xs">
                      <p><strong>Bank:</strong> Wema Bank / Providus</p>
                      <p><strong>Account Name:</strong> Short n’ Sweet Bakery Ltd</p>
                      <p><strong>Account Number:</strong> 0123456789</p>
                    </div>
                    <p className="text-[11px] text-[#717670] pt-1">
                      Clicking "Pay" below will automatically simulate account transfer verification and confirm your order.
                    </p>
                  </div>
                )}

                {(paymentMethod === 'mastercard' || paymentMethod === 'visa' || paymentMethod === 'verve') && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder || fullName}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name on card"
                        className="w-full px-4 py-2.5 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Card Number (Simulated)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="5399 •••• •••• 1042"
                        maxLength={19}
                        className={`w-full px-4 py-2.5 bg-[#FAF7EE] border rounded-xl text-xs ${
                          errors.cardNumber ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-[11px] text-[#C06E52] mt-1">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-2.5 bg-[#FAF7EE] border rounded-xl text-xs ${
                            errors.cardExpiry ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          className={`w-full px-4 py-2.5 bg-[#FAF7EE] border rounded-xl text-xs ${
                            errors.cardCvv ? 'border-[#C06E52]' : 'border-[#D1D5CE]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Order Review & Pay CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#20221F] pb-4 border-b border-[#F5F0D9]">
                  Review Order
                </h2>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#EAE4CE] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-bold text-[#20221F] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[#717670]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold tabular-nums text-[#20221F]">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="pt-4 border-t border-[#F5F0D9] space-y-2 text-xs text-[#4B4E4A]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#20221F] tabular-nums">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flat Delivery Fee</span>
                    <span className="font-semibold text-[#20221F] tabular-nums">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#F5F0D9] flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#20221F]">Total Due</span>
                    <span className="font-serif text-2xl font-bold text-[#20221F] tabular-nums">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit / Pay Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ₦{total.toLocaleString()}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#717670]">
                    <ShieldCheck className="w-4 h-4 text-[#5C7461]" />
                    <span>Simulated Sandbox · No real payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
