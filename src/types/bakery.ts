
export type UserRole = 'admin' | 'customer';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  available: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  delivery_address?: string;
  delivery_date?: string;
  payment_id?: string;
  payment_status: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product?: Product;
  quantity: number;
  price: number;
  created_at: string;
}
