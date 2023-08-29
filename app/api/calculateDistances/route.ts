import { Client } from '@googlemaps/google-maps-services-js';
import { NextApiRequest, NextApiResponse } from 'next';

const calculateDistances = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = new Client({});

  const origin = req.body.origin;
  const destinations = req.body.destinations;

  try {
    const r = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: destinations,
        mode: 'DRIVING' as any,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
      timeout: 1000, // milliseconds
    });

    const distances = r.data.rows[0].elements.map((element, index) => ({
      storeId: destinations[index].id,
      distanceText: element.distance.text,
      distanceValue: element.distance.value,
    }));

    distances.sort((a, b) => a.distanceValue - b.distanceValue);

    res.status(200).json(distances);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: 'An error occurred while calculating distances' });
  }
};

export default calculateDistances;
