import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

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
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },

  //TODO ab hier ist working
  {
    title: 'Customer',
    url: '/dashboard/customer',
    icon: 'employee',
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

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

//TODO ab hier ist Working
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

export interface Products {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

export const products: Products[] = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Gold',
    description: 'Description of Product 1',
    price: 100
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Rot',
    description: 'Description of Product 2',
    price: 200
  },
  {
    id: 3,
    name: 'Product 3',
    category: 'Blau',
    description: 'Description of Product 3',
    price: 300
  }
];

export interface Customer {
  id: number;
  customer_id: number;
  name: string;
  adress: string;
  phone: string;
  payment_method: string;
  orders: number[];
  invoices: number[];
}

export const customer: Customer[] = [
  {
    id: 1,
    customer_id: 1,
    name: 'John Doe',
    adress: '123 Main St, Springfield, IL',
    phone: '+1 (555) 123-4567',
    payment_method: 'Credit Card',
    orders: [1, 2],
    invoices: [1]
  },
  {
    id: 2,
    customer_id: 2,
    name: 'Jane Smith',
    adress: '456 Elm St, Springfield, IL',
    phone: '+1 (555) 987-6543',
    payment_method: 'PayPal',
    orders: [3],
    invoices: [2]
  }
];
