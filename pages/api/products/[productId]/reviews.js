// pages/api/products/[productId]/reviews.js
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/products';
import Review from '../../../../models/reviews';

export default async function handler(req, res) {
  await dbConnect();

  const { productId } = req.query;

  if (req.method === 'GET') {
    try {
      const reviews = await Review.find({ product: productId }).populate('user');
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { review, rating } = req.body;
      const newReview = await Review.create({
        product: productId,
        user: { name: 'John Doe' }, // Replace with actual user data
        review,
        rating,
      });

      // Update the product's average rating
      const product = await Product.findById(productId);
      product.averageRating =
        (product.averageRating * product.numReviews + rating) /
        (product.numReviews + 1);
      product.numReviews += 1;
      await product.save();

      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}