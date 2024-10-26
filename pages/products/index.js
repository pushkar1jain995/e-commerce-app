// pages/products/index.js
'use client'

import '@/app/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOOptimization from '@/components/SEOOptimization';

export default function ProductListingPage({ initialProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });

  useEffect(() => {
    const { category, priceRange } = router.query;
    setFilters({ 
      category: category || '', 
      priceRange: priceRange || '' 
    });
  }, [router.query]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      let url = '/api/products';
      const params = new URLSearchParams();
      
      if (filters.category && filters.category !== 'All') {
        params.append('category', filters.category);
      }
      if (filters.priceRange && filters.priceRange !== 'All') {
        params.append('priceRange', filters.priceRange);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const filteredProducts = await res.json();
      setProducts(filteredProducts);
    };

    fetchFilteredProducts();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    const query = {};
    if (newFilters.category && newFilters.category !== 'All') query.category = newFilters.category;
    if (newFilters.priceRange && newFilters.priceRange !== 'All') query.priceRange = newFilters.priceRange;
    
    router.push({
      pathname: '/products',
      query: query,
    }, undefined, { shallow: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOOptimization product={{ name: 'Product Listing', description: 'Browse our collection of products' }} />
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      
      <div className="flex mb-8">
        <div className="mr-4">
          <label htmlFor="category" className="block mb-2">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceRange" className="block mb-2">Price Range:</label>
          <select
            id="priceRange"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="border rounded p-4 hover:shadow-lg transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const initialProducts = await res.json();

  return {
    props: {
      initialProducts,
    },
  };
}