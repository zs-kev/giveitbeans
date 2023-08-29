'use client';

import ButtonPrimary from '@/components/ButtonPrimary';
import cafes from '@/lib/data/cafes.json';
import { useEffect, useState } from 'react';

const center = {
  lat: -26.1121,
  lng: 28.0588,
};

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const LocationPage = () => {
  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const calculateDistance = (
    lat1: number,
    long1: number,
    lat2: number,
    long2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(long2 - long1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const closestCafes = cafes.sort((a, b) => {
    return (
      calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.latitude,
        a.longitude
      ) -
      calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.latitude,
        b.longitude
      )
    );
  });

  return (
    <>
      <section>
        <div className="maxWdith text-center pb-16 md:pt-6 lg:pt-10 xl:pt-14">
          <h1>Visit us</h1>
          <p className="max-w-md mx-auto pt-4 pb-7 lg:py-7 xl:py-9">
            We love having a full house, so we&apos;ll be waiting for you
            everyday of the week at one of out little nests
          </p>
          <ButtonPrimary link={''}>Find a cafe</ButtonPrimary>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
