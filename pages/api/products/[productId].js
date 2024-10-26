// pages/api/products/[productId].js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/products';

export default async function handler(req, res) {
  await dbConnect();

  const { productId } = req.query;
  console.log(productId)

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ success: false });
    // console.log(error)
  }
}