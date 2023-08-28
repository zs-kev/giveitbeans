const WooCommerceResApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceResApi({
  url: 'http://give-it-beans.local/',
  consumerKey: process.env.WOO_CONSUMER!,
  consumerSecret: process.env.WOO_SECRET!,
  wpAPI: true,
  version: 'wc/v3',
});

export const getProductsData = async (perPage = 10) => {
  return await api.get('products', {
    per_page: perPage || 10,
  });
};
