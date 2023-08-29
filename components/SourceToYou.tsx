import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const SourceToYou = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <section className="bg-darkpattern py-16 md:py-20" ref={ref}>
      <div className="flex lg:items-start lg:justify-between flex-col lg:flex-row gap-14 lg:gap-0 maxWidth">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center text-center"
        >
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
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col items-center"
        >
          <Image
            src="/assets/images/chars/roaster.svg"
            alt="Direct from the producers"
            width={207}
            height={207}
          />
          <h3 className="pt-10 pb-2">Artisanal Roasting</h3>
          <p className="text-base text-white max-w-xs text-center">
            Each coffee is freshly roasted and ground for your lovely taste buds
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-col items-center"
        >
          <Image
            src="/assets/images/chars/delivery.svg"
            alt="Direct from the producers"
            width={207}
            height={207}
          />
          <h3 className="pt-10 pb-2">Super-fast Delivery</h3>
          <p className="text-base text-white max-w-xs text-center">
            Our packages are shipped the day of your order and delivered within
            48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SourceToYou;
