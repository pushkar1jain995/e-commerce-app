import Head from 'next/head';

export default function SEOOptimization({ product }) {
  return (
    <Head>
      <title>{product.name} - E-commerce App</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={`${product.name}, ${product.category}, e-commerce`} />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <meta property="og:url" content={`https://example.com/products/${product._id}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />
      <link rel="canonical" href={`https://example.com/products/${product._id}`} />
    </Head>
  );
}