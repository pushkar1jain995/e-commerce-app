import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Since we're using ES modules, we need to dynamically import the Product model
const Product = (await import('../models/products.js')).default;

const sampleProducts = [
  {
    name: 'Classic T-Shirt',
    category: 'clothing',
    price: 19.99,
    image: 'https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A comfortable cotton t-shirt for everyday wear.'
  },
  {
    name: 'Slim Fit Jeans',
    category: 'clothing',
    price: 49.99,
    image: 'https://t4.ftcdn.net/jpg/03/09/55/63/360_F_309556383_wfAujxKOTjUrJ8e6pXfbVEoIeVv1Mkm8.jpg',
    description: 'Classic blue jeans with a modern slim fit.'
  },
  {
    name: 'Smartphone X',
    category: 'electronics',
    price: 599.99,
    image: 'https://i.gadgets360cdn.com/large/nothing_phone_2_mkbhd_1688444985077.jpg',
    description: 'Latest model smartphone with advanced features.'
  },
  {
    name: 'Laptop Pro',
    category: 'electronics',
    price: 999.99,
    image: 'https://wallpapers.com/images/featured/laptop-murjp1nk4lp1idlt.jpg',
    description: 'Powerful laptop for work and entertainment.'
  },
  {
    name: 'Bestseller Novel',
    category: 'books',
    price: 14.99,
    image: 'https://live.staticflickr.com/8078/8314929977_28fd740070_b.jpg',
    description: 'A gripping story that topped the charts this year.'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();

