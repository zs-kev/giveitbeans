import ButtonPrimary from '@/components/ButtonPrimary';
import ProductListing from '@/components/ProductListing';
import Image from 'next/image';

const HomePage = () => {
  return (
    <>
      <section className="md:pt-6 lg:pt-10 xl:pt-14 relative overflow-hidden text-center px-6 md:px-8 lg:px-0">
        <h1 className="max-w-5xl mx-auto relative z-20">
          Experience a coffee for every mood
        </h1>
        <p className="max-w-sm mx-auto pt-4 pb-7 lg:py-7 xl:py-9 relative z-20">
          Bringing outstanding flavours to your cup. Here to make your coffee
          time memorable
        </p>
        <ButtonPrimary link={'/shop'}>Shop our coffees</ButtonPrimary>
        <div className="relative w-full max-w-3xl aspect-[199/310] mx-auto sm:-mt-14 z-20">
          <Image
            src="/assets/images/products/elparaiso-2.png"
            fill
            priority
            alt="El Paraiso"
          />
        </div>
        <Image
          src="/assets/images/backgroundImages/latteart.png"
          alt="Latte Art"
          width={387}
          height={376}
          className="absolute top-64 -left-32 z-10 hidden sm:block"
        />
        <Image
          src="/assets/images/backgroundImages/leafright.png"
          alt="Latte Art"
          width={386}
          height={588}
          className="absolute top-16 right-0 z-10 hidden lg:block"
        />
        <Image
          src="/assets/images/backgroundImages/beans.png"
          alt="Latte Art"
          width={403}
          height={404}
          className="absolute top-80 lg:top-96 right-0 md:right-10 lg:right-1/4 z-10 -rotate-90"
        />
        <Image
          src="/assets/images/backgroundImages/beans3.png"
          alt="Latte Art"
          width={403}
          height={446}
          className="absolute bottom-0 lg:bottom-48 left-0 lg:left-1/4 z-10 -rotate-90 hidden sm:block"
        />
        <Image
          src="/assets/images/backgroundImages/leafwithbeans.png"
          alt="Latte Art"
          width={305}
          height={588}
          className="absolute bottom-32 left-0 z-10 hidden lg:block"
        />
        <Image
          src="/assets/images/backgroundImages/doughnut-sugar.png"
          alt="Latte Art"
          width={389}
          height={366}
          className="absolute bottom-32 right-0 lg:right-7 z-10 hidden md:block"
        />
      </section>
      <section className="bg-darkpattern py-16 md:py-20">
        <div className="flex lg:items-start lg:justify-between flex-col lg:flex-row gap-14 lg:gap-0 maxWidth">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/images/chars/producer.svg"
              alt="Direct from the producers"
              width={207}
              height={207}
            />
            <h3 className="pt-10 pb-2">Direct from the producers</h3>
            <p className="text-base text-white max-w-xs text-center">
              We source the best coffees directly from producers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/chars/roaster.svg"
              alt="Direct from the producers"
              width={207}
              height={207}
            />
            <h3 className="pt-10 pb-2">Artisanal Roasting</h3>
            <p className="text-base text-white max-w-xs text-center">
              Each coffee is freshly roasted and ground for your lovely taste
              buds
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/chars/delivery.svg"
              alt="Direct from the producers"
              width={207}
              height={207}
            />
            <h3 className="pt-10 pb-2">Super-fast Delivery</h3>
            <p className="text-base text-white max-w-xs text-center">
              Our packages are shipped the day of your order and delivered
              within 48 hours
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-stretch justify-between flex-col lg:flex-row maxWidth py-16 md:py-24 lg:py-32">
          <ProductListing />
          <ProductListing />
          <ProductListing />
        </div>
      </section>
    </>
  );
};

export default HomePage;
