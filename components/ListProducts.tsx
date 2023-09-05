'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import ButtonPrimary from './ButtonPrimary';

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

interface ListProductsProps {}

const ListProducts: FC<ListProductsProps> = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/getProducts');
      if (!response.ok) {
        setError(
          'Looks like a network issue. Please check your connection, or try again a little later.'
        );
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(
          'There was a problem loading the products. This could be an issue on our side, please try again a little later.'
        );
        return;
      }
      setProducts(data);
    } catch (error) {
      setError('error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid lg:grid-flow-col lg:auto-cols-[1fr] gap-7 sm:gap-5 lg:gap-0 maxWidth py-16 md:py-24 lg:py-32">
      {error && (
        <div>
          <h2>Whoops...this is not good!</h2>
          <p>{error}</p>
        </div>
      )}
      {isLoading && (
        <div>
          <h2>Loading...</h2>
          <p>Brewing a good cup of coffee takes time.</p>
        </div>
      )}
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl flex flex-col items-stretch mx-3 justify-between p-10 sm:p-14 mt-24 flex-auto"
        >
          <Image
            src={product.images[0].src}
            alt={product.name}
            width={286}
            height={505}
            className="-mt-36"
          />
          <h2>{product.name}</h2>
          <p className="text-base">{stripHtml(product.short_description)}</p>
          <div className="flex items-end justify-between flex-wrap pt-12">
            <p className="font-Guy text-4xl text-primary">R{product.price}</p>
            <ButtonPrimary link={`/product/${product.id}`}>
              Select options
            </ButtonPrimary>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProducts;
