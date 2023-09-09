'use client';

import { EssentialProductInfo, useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options?: string[]; // optional because it may not always be present
}

interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  images: { src: string }[];
  variationDetails?: Array<any>;
  attributes: Attribute[];
}

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariation, setSelectedVariation] = useState<number | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

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
        setProduct(data);

        // Set the variation to the first option on initialization if the variations exist
        if (data.variationDetails && data.variationDetails.length > 0) {
          const firstVariation = data.variationDetails[0];
          setSelectedVariation(data.variationDetails[0].id);
          setProduct({ ...data, price: firstVariation.price }); // set the initial price here
        }
      } catch (error) {
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, []);

  const handleVariationChange = (id: number) => {
    setSelectedVariation(id);
    const newSelectedVariation = product?.variationDetails?.find(
      (variation) => variation.id === id
    );
    if (newSelectedVariation) {
      setProduct({
        ...product!,
        price: newSelectedVariation.price,
      });
    }
  };
  const handleAddToCart = () => {
    if (product) {
      const essentialProductInfo: EssentialProductInfo = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src, // Assuming your Product object has an image field. Adjust accordingly.
      };

      // Assuming the first variation is selected by default.
      const variationId =
        selectedVariation ||
        (product.variationDetails && product.variationDetails[0]?.id) ||
        0;
      addToCart(essentialProductInfo, quantity, variationId);
    }
  };

  return (
    <section className="maxWidth py-16">
      {error && (
        <div>
          <h2>Whoops! Looks like a bad extraction.</h2>
          <p>
            Seems like something went wrong when trying to fetch the product you
            are looking for. please try again a little later.
          </p>
        </div>
      )}
      {isLoading && (
        <div>
          <h2>Loading...</h2>
          <p>Brewing a good cup of coffee takes time.</p>
        </div>
      )}
      {product && (
        <>
          <div
            key={product.id}
            className="flex flex-col lg:flex-row items-stretch gap-28 justify-between flex-auto"
          >
            <div className="bg-white rounded-2xl flex items-center justify-center lg:w-1/2 p-10">
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={286}
                height={505}
              />
            </div>
            <div className="lg:w-1/2">
              <h1 className="text-left">{product.name}</h1>
              <p className="pb-14 pt-7">
                {stripHtml(product.short_description)}
              </p>
              <div className="grid grid-cols-2 gap-6 pb-14">
                {product.attributes &&
                  product.attributes.map(
                    (attribute, index) =>
                      attribute.variation === false &&
                      attribute.name !== 'Amount' &&
                      attribute.options &&
                      attribute.options.length > 0 && (
                        <div key={index}>
                          <h3>{attribute.name}: </h3>
                          <p>{attribute.options.join(', ')}</p>
                        </div>
                      )
                  )}
              </div>
              <hr className="w-full border-primary" />
              {product && product.variationDetails && (
                <div className="pt-14">
                  P<h3>Weight:</h3>
                  <div className="flex gap-2.5">
                    {product.variationDetails.map((variation) => (
                      <div key={variation.id} className="cursor-pointer mt-4">
                        <input
                          type="radio"
                          id={String(variation.id)}
                          name="variation"
                          value={variation.id}
                          checked={selectedVariation === variation.id}
                          onChange={() => handleVariationChange(variation.id)}
                          className="opacity-0 absolute peer"
                        />
                        <label
                          htmlFor={String(variation.id)}
                          className="cursor-pointer border-primary border-[1px] rounded-full px-8 py-4 peer-checked:bg-secondary peer-checked:border-secondary ease-in-out duration-300 peer-checked:text-white hover:bg-muted hover:text-white"
                        >
                          {variation.attributes[0].option.replace(/['"]+/g, '')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-12 pb-14">
                <p className="font-Guy text-4xl text-primary">
                  R{product.price}
                </p>
                <div className="flex justify-between">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="text-center w-24 border-primary border-[1px] rounded-full bg-transparent font-Zilla text-primary focus:border-secondary"
                  />
                  <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </div>
              <hr className="w-full border-primary" />
            </div>
          </div>
          <div>
            <article
              className="woo_description py-16"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></article>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductPage;
