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

type CafeInfo = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  phone: string;
  hours: string;
  description: string;
  isUserLocation?: boolean;
};

const mapContainerStyle = {
  height: '400px',
  width: '800px',
};

const center = {
  lat: -26.1121,
  lng: 28.0588,
};

const LocationPage = () => {
  const [userLocation, setUserLocation] = useState(center);
  const [closestCafes, setClosestCafes] = useState<CafeInfo[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<null | {
    id: string;
    lat: number;
    lng: number;
    name: string;
    phone: string;
    hours: string;
    description: string;
    isUserLocation?: boolean;
  }>(null);

  const fetchData = async () => {
    const origin = userLocation;
    const destinations = cafes.features.map((feature) => ({
      lat: feature.geometry.coordinates[0],
      lng: feature.geometry.coordinates[1],
      id: feature.properties.storeid,
    }));

    try {
      const res = await fetch('/api/calculateDistances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origin, destinations }),
      });
      if (res.ok) {
        const data = await res.json();
        setClosestCafes(data);
        console.log(data);
      } else {
        console.error(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [userLocation]);

  return (
    <>
      <section>
        <div className="maxWidth text-center pb-16 md:pt-6 lg:pt-10 xl:pt-14">
          <h1>Visit us</h1>
          <p className="max-w-md mx-auto pt-4 pb-7 lg:py-7 xl:py-9">
            We love having a full house, so we&apos;ll be waiting for you every
            day of the week at one of our little nests.
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
                  lat: userLocation.lat,
                  lng: userLocation.lng,
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
                  lat: selectedCafe.lat,
                  lng: selectedCafe.lng,
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
                position={{ lat: cafe.lat, lng: cafe.lng }}
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
