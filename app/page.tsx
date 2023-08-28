import Image from 'next/image';

const HomePage = () => {
  return (
    <section className="pt-14 relative overflow-hidden">
      <h1 className="max-w-5xl mx-auto relative z-20">
        Experience a coffee for every mood
      </h1>
      <p className="max-w-sm mx-auto py-9">
        Bringing outstanding flavours to your cup. Here to make your coffee time
        memorable
      </p>
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
    </section>
  );
};

export default HomePage;
