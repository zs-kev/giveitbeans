'use client';

import ButtonPrimary from '@/components/ButtonPrimary';
import ProductListing from '@/components/ProductListing';
import SourceToYou from '@/components/SourceToYou';
import products from '@/lib/data/mockProducts.json';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const mainIntro = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const backgroundIntroLeft = {
  hidden: { x: '-100%' },
  visible: { x: '0%' },
};

const backgroundIntroRight = {
  hidden: { x: '100%' },
  visible: { x: '0%' },
};

const HomePage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const cupY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const leafRightY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const beansTopY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const beansBottomY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <>
      <section
        className="md:pt-6 lg:pt-10 xl:pt-14 relative overflow-hidden text-center px-6 md:px-8 lg:px-0"
        ref={ref}
      >
        <motion.h1
          variants={mainIntro}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto relative z-20"
        >
          Experience a coffee for every mood
        </motion.h1>
        <motion.p
          variants={mainIntro}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-sm mx-auto pt-4 pb-7 lg:py-7 xl:py-9 relative z-20"
        >
          Bringing outstanding flavours to your cup. Here to make your coffee
          time memorable
        </motion.p>
        <motion.div
          variants={mainIntro}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ButtonPrimary link={'/shop'}>Shop our coffees</ButtonPrimary>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.85 }}
          className="relative w-full max-w-3xl aspect-[199/310] mx-auto sm:-mt-14 z-20"
        >
          <Image
            src="/assets/images/products/elparaiso-2.png"
            fill
            priority
            alt="El Paraiso"
          />
        </motion.div>
        <motion.div
          variants={backgroundIntroLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ y: cupY }}
          className="absolute top-64 -left-32 z-10 hidden sm:block"
        >
          <Image
            src="/assets/images/backgroundImages/latteart.png"
            alt="Latte Art"
            width={387}
            height={376}
          />
        </motion.div>
        <motion.div
          variants={backgroundIntroRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ y: leafRightY }}
          className="absolute top-16 right-0 z-10 hidden lg:block"
        >
          <Image
            src="/assets/images/backgroundImages/leafright.png"
            alt="Latte Art"
            width={386}
            height={588}
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -25, y: -15 },
            visible: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.15 }}
          style={{ y: beansTopY }}
          className="absolute top-80 lg:top-96 right-0 md:right-10 lg:right-1/4 z-10"
        >
          <Image
            src="/assets/images/backgroundImages/beans.png"
            alt="Latte Art"
            width={403}
            height={404}
            className="-rotate-90"
          />
        </motion.div>
        <motion.div
          style={{ y: beansBottomY }}
          className="absolute bottom-0 lg:bottom-48 left-0 lg:left-1/4 z-10 hidden sm:block"
        >
          <Image
            src="/assets/images/backgroundImages/beans3.png"
            alt="Latte Art"
            width={403}
            height={446}
            className="-rotate-90"
          />
        </motion.div>
        <motion.div
          style={{ y: leafRightY }}
          variants={backgroundIntroLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.85 }}
          className="absolute bottom-32 left-0 z-10 hidden lg:block"
        >
          <Image
            src="/assets/images/backgroundImages/leafwithbeans.png"
            alt="Latte Art"
            width={305}
            height={588}
          />
        </motion.div>
        <motion.div
          style={{ y: cupY }}
          className="absolute bottom-32 right-0 lg:right-7 z-10 hidden md:block"
        >
          <Image
            src="/assets/images/backgroundImages/doughnut-sugar.png"
            alt="Latte Art"
            width={389}
            height={366}
          />
        </motion.div>
      </section>
      <SourceToYou />
      <section>
        <div className="grid lg:grid-flow-col lg:auto-cols-[1fr] gap-7 sm:gap-5 lg:gap-0 maxWidth py-16 md:py-24 lg:py-32">
          {products.map((product) => (
            <ProductListing key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
