const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
  url: 'http://give-it-beans.local/',
  consumerKey: process.env.WOO_CONSUMER!,
  consumerSecret: process.env.WOO_SECRET!,
  wpAPI: true,
  version: 'wc/v3',
});

export default async function getData() {
  try {
    WooCommerce.get(
      'products',
      async (err: any, data: object, response: any) => {
        if (err) {
          // response.status(500).json({ error: err.message });
          return { error: err };
        }
        return { products: data };
      }
    );
  } catch (error) {
    return { error };
  }
}
// export default async function getData() {
//   return new Promise((resolve, reject) => {
//     WooCommerce.get('products', (err: any, data: object, response: any) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const products = JSON.parse(response);
//       resolve(products);
//     });
//   });
// }
