'use client';

import ButtonPrimary from '@/components/ButtonPrimary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  images: { src: string }[];
}

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!params.productId) {
          return; // exit if productId is not yet available
        }

        setIsLoading(true);
        const response = await fetch(
          `/api/getSingleProduct/${params.productId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, []);

  return (
    <section className="maxWidth py-16 md:py-24 lg:py-32">
      {isLoading && (
        <div>
          <h2>Loading...</h2>
          <p>Brewing a good cup of coffee takes time.</p>
        </div>
      )}
      {product && (
        <div
          key={product.id}
          className="flex items-stretch justify-between mt-24 flex-auto"
        >
          <Image
            src={product.images[0].src}
            alt={product.name}
            width={286}
            height={505}
            className="w-1/2"
          />
          <div className="bg-white rounded-2xl p-10 sm:p-14 w-1/2">
            <h2>{product.name}</h2>
            <p className="text-base">{stripHtml(product.short_description)}</p>
            <div className="flex items-end justify-between flex-wrap pt-12">
              <p className="font-Guy text-4xl text-primary">R{product.price}</p>
              <ButtonPrimary link={`/product/${product.id}`}>
                Add to Cart
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
