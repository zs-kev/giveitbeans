import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextResponse } from 'next/server';

const api = new WooCommerceRestApi({
  url: 'https://giveitbeans.cloudaccess.host/',
  consumerKey: process.env.WOO_LIVE_CONSUMER!,
  consumerSecret: process.env.WOO_LIVE_SECRET!,
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
