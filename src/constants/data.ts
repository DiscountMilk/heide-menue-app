import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Customer',
    url: '/dashboard/customer',
    icon: 'employee',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Products',
    url: '/dashboard/product',
    icon: 'pizza',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: 'product',
    shortcut: ['o', 'o'],
    isActive: false,
    items: [] // No child items
  }
];

export interface Order {
  id: number;
  date_created: string;
  date_delivery: string;
  customer_id: number;
  amount: number;
  additional_info: string;
  product_id: number;
}

export const orders: Order[] = [
  {
    id: 1,
    date_created: '2023-10-01',
    date_delivery: '2023-10-05',
    customer_id: 1,
    amount: 100,
    additional_info: 'Please deliver before noon.',
    product_id: 1
  },
  {
    id: 2,
    date_created: '2023-10-02',
    date_delivery: '2023-10-06',
    customer_id: 2,
    amount: 200,
    additional_info: 'Leave at the front door.',
    product_id: 2
  },
  {
    id: 3,
    date_created: '2023-10-03',
    date_delivery: '2023-10-07',
    customer_id: 1,
    amount: 300,
    additional_info: 'Call me when you arrive.',
    product_id: 3
  }
];

export interface Product {
  id: number;
  name: string;
  sales_price: number;
  purchase_price: number;
}

export interface paymentMethods {
  id: number;
  method: string;
}

export interface Customer {
  id: number;
  name: string;
  adress: string;
  phone: string;
  payment_method: paymentMethods['id'];
  additional_info?: string;
  orders?: number[];
}

export const customer: Customer[] = [
  {
    id: 1,
    name: 'John Doe',
    adress: '123 Main St, Springfield, IL',
    phone: '+1 (555) 123-4567',
    payment_method: 1,
    orders: [1, 2]
  },
  {
    id: 2,
    name: 'Jane Smith',
    adress: '456 Elm St, Springfield, IL',
    phone: '+1 (555) 987-6543',
    payment_method: 2,
    orders: [3]
  }
];
