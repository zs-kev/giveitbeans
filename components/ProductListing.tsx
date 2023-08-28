import Image from 'next/image';
import { FC } from 'react';
import ButtonPrimary from './ButtonPrimary';

interface ProductListingProps {}

const ProductListing: FC<ProductListingProps> = () => {
  return (
    <div className="bg-white rounded-2xl flex flex-col items-stretch mx-3 justify-between p-14 mt-24">
      <Image
        src="/assets/images/products/elparaiso-crop.png"
        alt="El Paraiso"
        width={286}
        height={505}
        className="-mt-36"
      />
      <h2>El Paraiso</h2>
      <p className="text-base">
        A new batch of Colombian coffee with notes of blueberry and violets, a
        gourmet and sweet coffee
      </p>
      <div className="flex items-end justify-between flex-wrap pt-12">
        <p className="font-Guy text-4xl text-primary">R321.87</p>
        <ButtonPrimary link="">Buy now</ButtonPrimary>
      </div>
    </div>
  );
};

export default ProductListing;
