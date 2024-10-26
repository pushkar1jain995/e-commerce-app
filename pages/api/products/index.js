// pages/api/products/index.js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/products';

export default async function handler(req, res) {
  await dbConnect();

  const { category, priceRange } = req.query;
  
  let query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (priceRange && priceRange !== 'All') {
    const [min, max] = priceRange.split('-').map(Number);
    query.price = { $gte: min };
    if (max) {
      query.price.$lte = max;
    } else if (priceRange === '100+') {
      query.price = { $gte: 100 };
    }
  }

  try {
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

