export type ProductCategory = 
  | 'all'
  | 'cakes'
  | 'cupcakes'
  | 'pastries'
  | 'cookies'
  | 'brownies'
  | 'boxes';

export type ProductMood = 
  | 'celebrate'     // Something to Celebrate
  | 'sweet'         // Just a Little Sweet
  | 'hungry';       // I'm Hungry

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  mood: ProductMood;
  price: number; // in Naira (NGN)
  shortDescription: string;
  description: string;
  image: string;
  isBestseller?: boolean;
  leadTimeDays?: number; // e.g. 2 for cakes
  servings?: string;
  ingredients?: string[];
  allergens?: string[];
  inStock: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  deliveryDate?: string;
  customNote?: string;
}

export type PaymentMethod = 'bank_transfer' | 'mastercard' | 'visa' | 'verve';

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  area: string;
  state: string;
  deliveryDate: string;
  deliveryNote?: string;
}

export type OrderStatus = 'received' | 'baking' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string; // e.g. SNS-1042
  createdAt: string;
  status: OrderStatus;
  customer: DeliveryDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
}
