import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, Truck, Heart, Package, AlertCircle, RefreshCw } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../types';

interface TrackOrderPageProps {
  initialOrderId?: string | null;
  initialEmail?: string | null;
  onNavigate: (path: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderId,
  initialEmail,
  onNavigate,
}) => {
  const { orders, getOrder, updateOrderStatus } = useOrders();

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId || 'SNS-1042');
  const [emailInput, setEmailInput] = useState(initialEmail || 'adesegunferanmi@gmail.com');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setOrderIdInput(initialOrderId);
      if (initialEmail) setEmailInput(initialEmail);
      const found = getOrder(initialOrderId, initialEmail || '');
      if (found) {
        setSearchedOrder(found);
        setHasSearched(true);
      }
    } else {
      // Default to the first existing order for instant inspection
      if (orders.length > 0) {
        setSearchedOrder(orders[0]);
        setOrderIdInput(orders[0].id);
        setEmailInput(orders[0].customer.email);
        setHasSearched(true);
      }
    }
  }, [initialOrderId, initialEmail, orders]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    setHasSearched(true);
    const found = getOrder(orderIdInput.trim(), emailInput.trim());
    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const loadDemoOrder = (order: Order) => {
    setOrderIdInput(order.id);
    setEmailInput(order.customer.email);
    setSearchedOrder(order);
    setNotFound(false);
    setHasSearched(true);
  };

  // Timeline steps
  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    {
      key: 'received',
      label: 'Order Received',
      desc: 'Your order was logged and ingredients prepped in Gbagada.',
      icon: Clock,
    },
    {
      key: 'baking',
      label: 'Baking Fresh',
      desc: 'Ovens hot, pastry layers rising, creams whipped fresh.',
      icon: Package,
    },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      desc: 'Boxed with ribbon, on dispatch with our temperature rider.',
      icon: Truck,
    },
    {
      key: 'delivered',
      label: 'Delivered',
      desc: 'Arrived at your door. Comfort in every single bite.',
      icon: CheckCircle2,
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'baking': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
            Real-Time Bakery Status
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20221F]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4E4A]">
            No account required. Enter your order reference and email below to view real-time baking and dispatch status.
          </p>
        </div>

        {/* Search Lookup Form */}
        <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                Order Number *
              </label>
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="e.g. SNS-1042"
                className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs font-medium text-[#20221F] uppercase focus:outline-none focus:ring-2 focus:ring-[#383A37]"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="adesegunferanmi@gmail.com"
                className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs font-medium text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#20221F] text-[#FAF7EE] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Selector */}
          {orders.length > 0 && (
            <div className="pt-2 border-t border-[#F5F0D9] flex items-center gap-2 text-xs text-[#717670] flex-wrap">
              <span className="font-semibold text-[#20221F]">Test with recent orders:</span>
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  onClick={() => loadDemoOrder(o)}
                  className="px-2.5 py-1 bg-[#FAF7EE] border border-[#D1D5CE] rounded-md text-[11px] font-bold text-[#20221F] hover:bg-[#EAE4CE] transition-colors"
                >
                  #{o.id} ({o.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="p-8 text-center bg-white border border-[#EAE4CE] rounded-3xl space-y-3">
            <AlertCircle className="w-8 h-8 text-[#C06E52] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#20221F]">
              No order found matching "{orderIdInput}"
            </h3>
            <p className="text-xs text-[#717670] max-w-sm mx-auto">
              Please double check the order number in your receipt, or select one of the test demo orders above.
            </p>
          </div>
        )}

        {/* Order Result Card */}
        {searchedOrder && (
          <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F5F0D9] gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#5C7461] font-bold block mb-1">
                  Verified Order Receipt
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#20221F]">
                  Order #{searchedOrder.id}
                </h2>
                <p className="text-xs text-[#717670] mt-0.5">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · Destined for {searchedOrder.customer.area}, {searchedOrder.customer.state}
                </p>
              </div>

              {/* Status Simulator Control for Portfolio Evaluation */}
              <div className="p-3 bg-[#FAF7EE] border border-[#EAE4CE] rounded-2xl space-y-1 sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#717670] block">
                  Simulate Order State:
                </span>
                <div className="flex items-center gap-1">
                  {(['received', 'baking', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateOrderStatus(searchedOrder.id, st)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                        searchedOrder.status === st
                          ? 'bg-[#20221F] text-[#FAF7EE]'
                          : 'bg-white text-[#5A5E59] border border-[#D1D5CE] hover:bg-[#EAE4CE]'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual 4-Step Timeline */}
            <div className="py-4">
              <div className="relative">
                {/* Horizontal line on desktop */}
                <div className="hidden md:block absolute top-7 left-12 right-12 h-1 bg-[#EAE4CE] -z-0">
                  <div
                    className="h-full bg-[#5C7461] transition-all duration-500"
                    style={{ width: `${(currentStepIndex / 3) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.key}
                        className={`flex md:flex-col items-start md:items-center gap-4 md:gap-3 text-left md:text-center p-3 rounded-2xl transition-all ${
                          isCurrent ? 'bg-[#FAF7EE] border border-[#D1D5CE]' : ''
                        }`}
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            isCompleted
                              ? 'bg-[#5C7461] border-[#5C7461] text-[#FAF7EE] shadow-md'
                              : 'bg-white border-[#D1D5CE] text-[#8E948D]'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 md:justify-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#717670]">
                              Step 0{index + 1}
                            </span>
                            {isCurrent && (
                              <span className="bg-[#E7EDE8] text-[#3E5142] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                                Active
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif font-bold text-sm text-[#20221F] mt-0.5">
                            {step.label}
                          </h4>
                          <p className="text-[11px] text-[#5A5E59] mt-1 leading-normal max-w-[200px]">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Snapshot & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#F5F0D9] text-xs">
              <div className="space-y-2 p-4 bg-[#FAF7EE] rounded-2xl">
                <h4 className="font-serif font-bold text-sm text-[#20221F]">
                  Delivery Details
                </h4>
                <p><strong>Customer:</strong> {searchedOrder.customer.fullName}</p>
                <p><strong>Address:</strong> {searchedOrder.customer.address}, {searchedOrder.customer.area}</p>
                <p><strong>State:</strong> {searchedOrder.customer.state}</p>
                <p><strong>Delivery Window:</strong> {searchedOrder.estimatedDelivery}</p>
                {searchedOrder.customer.deliveryNote && (
                  <p className="italic text-[#717670]">Note: "{searchedOrder.customer.deliveryNote}"</p>
                )}
              </div>

              <div className="space-y-2 p-4 bg-[#FAF7EE] rounded-2xl">
                <h4 className="font-serif font-bold text-sm text-[#20221F]">
                  Package Contents
                </h4>
                <ul className="space-y-1.5">
                  {searchedOrder.items.map((it) => (
                    <li key={it.product.id} className="flex justify-between items-center text-xs">
                      <span>{it.quantity}× {it.product.name}</span>
                      <span className="font-semibold tabular-nums">₦{(it.product.price * it.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[#EAE4CE] flex justify-between font-bold text-sm text-[#20221F]">
                  <span>Total Order (incl. ₦2,500 delivery)</span>
                  <span className="font-serif tabular-nums">₦{searchedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
