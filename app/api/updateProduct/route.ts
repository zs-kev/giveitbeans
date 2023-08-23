// TODO

// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const eventData = req.body;

//     // Handle the event. For example, if it's a product update:
//     if (eventData.topic === 'product.updated') {
//       const updatedProduct = eventData.payload;

//       // Update the product in your separate database
//       await prisma.product.update({
//         where: { id: updatedProduct.id },
//         data: {
//           name: updatedProduct.name,
//           price: updatedProduct.price,
//         },
//       });
//     }

//     return res.status(200).send('Webhook received and processed.');
//   }
// }
