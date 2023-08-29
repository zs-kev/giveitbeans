'use client';

import ButtonPrimary from '@/components/ButtonPrimary';
import cafes from '@/lib/data/cafes.json';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const cafesInfo = cafes.features.map((feature) => {
  return {
    id: feature.properties.storeid,
    latitude: feature.geometry.coordinates[0],
    longitude: feature.geometry.coordinates[1],
    name: feature.properties.name,
    phone: feature.properties.phone,
    hours: feature.properties.hours,
    description: feature.properties.description,
  };
});

const mapContainerStyle = {
  height: '400px',
  width: '800px',
};

const center = {
  lat: -26.1121,
  lng: 28.0588,
};

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const LocationPage = () => {
  const [userLocation, setUserLocation] = useState(center);
  // const [isUserLocationSelected, setIsUserLocationSelected] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<null | {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    hours: string;
    description: string;
    isUserLocation?: boolean;
  }>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
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

  const closestCafes = cafesInfo.sort((a, b) => {
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
        <LoadScript googleMapsApiKey={process.env.GOOGLE!}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={14}
          >
            <Marker
              position={userLocation}
              onClick={() => {
                setSelectedCafe({
                  id: 'user-location',
                  latitude: userLocation.lat,
                  longitude: userLocation.lng,
                  name: 'Your Location',
                  phone: '',
                  hours: '',
                  description: '',
                  isUserLocation: true,
                });
              }}
            />
            {selectedCafe && (
              <InfoWindow
                position={{
                  lat: selectedCafe.latitude,
                  lng: selectedCafe.longitude,
                }}
                onCloseClick={() => {
                  setSelectedCafe(null);
                }}
              >
                <div>
                  <h2>{selectedCafe.name}</h2>
                </div>
              </InfoWindow>
            )}

            {closestCafes.map((cafe) => (
              <Marker
                key={cafe.id}
                position={{ lat: cafe.latitude, lng: cafe.longitude }}
                onClick={() => {
                  setSelectedCafe(cafe);
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </section>
    </>
  );
};

export default LocationPage;
