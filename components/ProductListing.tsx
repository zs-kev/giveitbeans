import Image from 'next/image';
import { FC } from 'react';
import ButtonPrimary from './ButtonPrimary';

interface ProductListingProps {
  product: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
  };
}

const ProductListing: FC<ProductListingProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl flex flex-col items-stretch mx-3 justify-between p-10 sm:p-14 mt-24 flex-auto">
      <Image
        src={product.image}
        alt={product.name}
        width={286}
        height={505}
        className="-mt-36"
      />
      <h2>{product.name}</h2>
      <p className="text-base">{product.description}</p>
      <div className="flex items-end justify-between flex-wrap pt-12">
        <p className="font-Guy text-4xl text-primary">R{product.price}</p>
        <ButtonPrimary link="">Buy now</ButtonPrimary>
      </div>
    </div>
  );
};

export default ProductListing;
