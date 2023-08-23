//TODO

// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';
// const prisma = new PrismaClient();
// const WooCommerceAPI = require('woocommerce-api');

// const WooCommerce = new WooCommerceAPI({
//   url: 'http://give-it-beans.local/',
//   consumerKey: process.env.WOO_CONSUMER,
//   consumerSecret: process.env.WOO_SECRET,
//   wpAPI: true,
//   version: 'wc/v3',
// });

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     WooCommerce.get(
//       'products',
//       async (err: any, data: object, response: string) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }

//         const products = JSON.parse(response);

//         const productsToInsert = products.map((product: any) => ({
//           id: product.id,
//           name: product.name,
//           description: product.description,
//           price: parseFloat(product.price),
//           imageUrl: product.imageUrl,

//         }));

//         await prisma.product.createMany({
//           data: productsToInsert,
//           skipDuplicates: true, // This ensures that if a product with the same id already exists, it won't throw an error
//         });

//         res.status(200).json({ status: true });
//       }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'An unknown error occurred' });
//     }
//   }
// }
