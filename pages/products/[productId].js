// pages/products/[productId].js
import '@/app/globals.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOOptimization from '@/components/SEOOptimization';
import UserReviews from '@/components/UserReviews';

export default function ProductDetailPage({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
          <SEOOptimization product={product} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
                <div className="flex flex-col md:flex-row">
                    <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-8" />
                    <div>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-2xl font-bold mb-4">${product.price}</p>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto ml-6 my-3">
            <Link href={`/products`} className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600">All Products</Link>
            </div>
            <UserReviews productId={product._id} />
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.productId}`);
    const product = await res.json();
  
    if (!product) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        product,
      },
    };
  }