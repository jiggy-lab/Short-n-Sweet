import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, DeliveryDetails, PaymentMethod, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (
    customer: DeliveryDetails,
    paymentMethod: PaymentMethod,
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    total: number
  ) => Order;
  getOrder: (orderId: string, email: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCurrentOrder: (order: Order | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'short_n_sweet_orders_v1';

// Seed sample order #SNS-1042 for instant portfolio demo verification
const SEED_ORDER: Order = {
  id: 'SNS-1042',
  createdAt: '2026-10-01T14:30:00.000Z',
  status: 'baking',
  customer: {
    fullName: 'Feranmi Adesegun',
    email: 'adesegunferanmi@gmail.com',
    phone: '+234 812 345 6789',
    address: '14 Alhaja Kofoworola Crescent, off Diya Street',
    area: 'Gbagada Phase 2',
    state: 'Lagos',
    deliveryDate: '2026-10-03',
    deliveryNote: 'Please ring bell twice or call on arrival.',
  },
  items: [
    {
      product: PRODUCTS[0], // Salted Caramel Drip Cake
      quantity: 1,
      customNote: 'Happy 25th Birthday Tolu!',
    },
    {
      product: PRODUCTS[1], // Fudgy Sea Salt Brownies
      quantity: 1,
    },
  ],
  subtotal: 33000,
  deliveryFee: 2500,
  total: 35500,
  paymentMethod: 'bank_transfer',
  estimatedDelivery: 'Tomorrow, between 1:00 PM – 3:30 PM',
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return [SEED_ORDER];
    } catch {
      return [SEED_ORDER];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    return orders[0] || null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const createOrder = (
    customer: DeliveryDetails,
    paymentMethod: PaymentMethod,
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    total: number
  ): Order => {
    // Generate order ID like SNS-1043
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SNS-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'received',
      customer,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      estimatedDelivery: customer.deliveryDate 
        ? `${customer.deliveryDate}, between 1:00 PM – 4:00 PM` 
        : 'In 24 - 48 hours',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const getOrder = (orderId: string, email: string): Order | null => {
    const cleanId = orderId.trim().toUpperCase().replace('#', '');
    const cleanEmail = email.trim().toLowerCase();

    const found = orders.find((o) => {
      const matchId = o.id.toUpperCase() === cleanId || o.id.toUpperCase().endsWith(cleanId);
      const matchEmail = !cleanEmail || o.customer.email.toLowerCase() === cleanEmail;
      return matchId && matchEmail;
    });

    return found || null;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        createOrder,
        getOrder,
        updateOrderStatus,
        setCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
