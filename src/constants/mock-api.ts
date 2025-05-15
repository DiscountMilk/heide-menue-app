////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
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

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();

//TODO ab hier ist Working

import { customer, orders, products } from './data';

export interface Order {
  id: number;
  date_created: string;
  date_delivery: string;
  customer_id: number;
  amount: number;
  additional_info: string;
  product_id: number;
}

export interface Products {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

export interface Customer {
  id: number;
  name: string;
  adress: string;
  phone: string;
  payment_method: string;
  additional_info?: string;
  orders?: number[];
}

export const fakeDatabase = {
  customers: [] as Customer[],
  orders: [] as Order[],
  products: [] as Products[],

  // Initialize with sample data
  initialize() {
    this.customers = customer;
    this.orders = orders;
    this.products = products;
  },

  // Get all customers with optional search
  async getCustomers({ search }: { search?: string }) {
    await delay(500); // Simulate delay
    let result = [...this.customers];

    if (search) {
      result = matchSorter(result, search, {
        keys: ['name', 'adress', 'phone']
      });
    }

    return result;
  },

  // Get a specific customer by their ID
  async getCustomerById(id: number) {
    await delay(500); // Simulate a delay

    // Find the customer by their ID
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer) {
      return {
        success: false,
        message: `Customer with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Customer with ID ${id} found`,
      customer
    };
  },
  // Get paginated customers
  async getPaginatedCustomers({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allCustomers = await this.getCustomers({ search });
    const totalCustomers = allCustomers.length;

    const offset = (page - 1) * limit;
    const paginatedCustomers = allCustomers.slice(offset, offset + limit);

    return {
      success: true,
      total_customers: totalCustomers,
      customers: paginatedCustomers
    };
  },

  // Get paginated orders
  async getPaginatedOrders({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(500); // Simulate delay
    let allOrders = [...this.orders];

    // Optional search functionality (if needed)
    if (search) {
      allOrders = matchSorter(allOrders, search, {
        keys: ['id', 'customer_id'] // Adjust keys based on searchable fields
      });
    }

    const totalOrders = allOrders.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedOrders = allOrders.slice(offset, offset + limit);

    return {
      success: true,
      total_orders: totalOrders,
      orders: paginatedOrders
    };
  },

  // Get all customers with optional search
  async getOrders({ search }: { search?: string }) {
    await delay(500); // Simulate delay
    let result = [...this.orders];

    if (search) {
      result = matchSorter(result, search, {
        keys: ['date_delivery', 'customer_id', 'product_id']
      });
    }

    return result;
  },

  // Get a specific order by its ID
  async getOrderById(id: number) {
    await delay(500); // Simulate a delay

    // Find the order by its ID
    const order = this.orders.find((order) => order.id === id);

    if (!order) {
      return {
        success: false,
        message: `Order with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Order with ID ${id} found`,
      order
    };
  },

  // Get all orders for a specific customer
  async getOrdersByCustomerId(customerId: number) {
    await delay(500); // Simulate delay
    return this.orders.filter((order) => order.customer_id === customerId);
  },

  // Get all products with optional search and category filtering
  async getProducts({
    search,
    category
  }: {
    search?: string;
    category?: string;
  }) {
    await delay(500); // Simulate delay
    let result = [...this.products];

    if (category) {
      result = result.filter((product) => product.category === category);
    }

    if (search) {
      result = matchSorter(result, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return result;
  }
};

// Initialize the database
fakeDatabase.initialize();
