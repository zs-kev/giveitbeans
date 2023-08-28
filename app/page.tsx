import ButtonPrimary from '@/components/ButtonPrimary';
import Image from 'next/image';

const HomePage = () => {
  return (
    <section className="pt-14 relative overflow-hidden text-center">
      <h1 className="max-w-5xl mx-auto relative z-20">
        Experience a coffee for every mood
      </h1>
      <p className="max-w-sm mx-auto py-9">
        Bringing outstanding flavours to your cup. Here to make your coffee time
        memorable
      </p>
      <ButtonPrimary link={'/shop'}>Shop our coffees</ButtonPrimary>
      <div className="relative w-full max-w-3xl aspect-[199/310] mx-auto -mt-14 z-20">
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
        className="absolute top-64 -left-32 z-10"
      />
      <Image
        src="/assets/images/backgroundImages/leafright.png"
        alt="Latte Art"
        width={386}
        height={588}
        className="absolute top-16 right-0 z-10"
      />
      <Image
        src="/assets/images/backgroundImages/beans.png"
        alt="Latte Art"
        width={403}
        height={404}
        className="absolute top-96 right-1/4 z-10 -rotate-90"
      />
      <Image
        src="/assets/images/backgroundImages/beans3.png"
        alt="Latte Art"
        width={403}
        height={446}
        className="absolute bottom-48 left-1/4 z-10 -rotate-90"
      />
      <Image
        src="/assets/images/backgroundImages/leafwithbeans.png"
        alt="Latte Art"
        width={305}
        height={588}
        className="absolute bottom-32 left-0 z-10"
      />
      <Image
        src="/assets/images/backgroundImages/doughnut-sugar.png"
        alt="Latte Art"
        width={389}
        height={366}
        className="absolute bottom-32 right-7 z-10"
      />
    </section>
  );
};

export default HomePage;
