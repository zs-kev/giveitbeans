import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextResponse } from 'next/server';

const api = new WooCommerceRestApi({
  url: 'http://give-it-beans.local/',
  consumerKey: process.env.WOO_CONSUMER!,
  consumerSecret: process.env.WOO_SECRET!,
  version: 'wc/v3',
});

export async function GET() {
  try {
    const res = await api.get('products');
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({
      error: 'An error occurred while fetching data',
    });
  }
}
