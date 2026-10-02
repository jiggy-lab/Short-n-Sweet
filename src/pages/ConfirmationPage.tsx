import React from 'react';
import { CheckCircle2, Mail, ArrowRight, Home, PackageCheck, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

interface ConfirmationPageProps {
  orderId?: string | null;
  onNavigate: (path: string) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const { orders, currentOrder } = useOrders();

  // Find order by ID or fallback to current/most recent
  const order = (orderId ? orders.find((o) => o.id === orderId) : null) || currentOrder || orders[0];

  if (!order) {
    return (
      <div className="bg-[#FAF7EE] min-h-[70vh] py-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#20221F]">
            No recent order found.
          </h2>
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-2.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Card */}
        <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 pb-8 border-b border-[#F5F0D9]">
            <div className="w-16 h-16 bg-[#E7EDE8] text-[#5C7461] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <p className="text-xs uppercase tracking-widest text-[#5C7461] font-bold">
              Order Confirmed
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#20221F]">
              Your sweet order is locked in!
            </h1>

            <p className="text-sm text-[#4B4E4A]">
              Your order <span className="font-bold text-[#20221F]">#{order.id}</span> has been received in our Gbagada kitchen.
            </p>

            {/* Simulated Email notice */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF7EE] border border-[#EAE4CE] rounded-full text-xs text-[#5A5E59]">
              <Mail className="w-3.5 h-3.5 text-[#5C7461]" />
              <span>A confirmation email has been dispatched to <strong>{order.customer.email}</strong></span>
            </div>
          </div>

          {/* Quick Snapshot Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4B4E4A]">
            <div className="p-4 bg-[#FAF7EE] rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#20221F]">
                <Calendar className="w-4 h-4 text-[#5C7461]" />
                <span>Target Delivery Date</span>
              </div>
              <p className="text-sm font-serif font-bold text-[#20221F]">
                {order.customer.deliveryDate || 'Within 24 - 48 Hours'}
              </p>
              <p className="text-[11px] text-[#717670]">Estimated dispatch window: 1:00 PM – 4:00 PM</p>
            </div>

            <div className="p-4 bg-[#FAF7EE] rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#20221F]">
                <MapPin className="w-4 h-4 text-[#5C7461]" />
                <span>Delivery Address</span>
              </div>
              <p className="font-medium text-[#20221F] truncate">
                {order.customer.address}, {order.customer.area}
              </p>
              <p className="text-[11px] text-[#717670]">{order.customer.state}</p>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#20221F]">
              Ordered Treats
            </h3>

            <div className="space-y-3 divide-y divide-[#F5F0D9]">
              {order.items.map((item) => (
                <div key={item.product.id} className="pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-[#EAE4CE]"
                    />
                    <div>
                      <p className="font-serif font-bold text-[#20221F]">
                        {item.product.name}
                      </p>
                      <p className="text-[#717670]">
                        Qty: {item.quantity} · ₦{item.product.price.toLocaleString()}
                      </p>
                      {item.customNote && (
                        <p className="text-[11px] text-[#5C7461] italic">
                          Note: "{item.customNote}"
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#20221F] tabular-nums">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F5F0D9] space-y-1.5 text-xs text-[#4B4E4A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-[#20221F]">
                  ₦{order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Delivery</span>
                <span className="tabular-nums font-semibold text-[#20221F]">
                  ₦{order.deliveryFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#20221F] pt-2 border-t border-[#EAE4CE]">
                <span>Total Paid (Simulated)</span>
                <span className="font-serif text-lg tabular-nums">
                  ₦{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onNavigate(`/track-order?id=${order.id}&email=${encodeURIComponent(order.customer.email)}`)}
              className="w-full sm:flex-1 py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Track Order #{order.id}</span>
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-6 py-4 bg-transparent border border-[#20221F] text-[#20221F] rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#F5F0D9] transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
