import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextRequest, NextResponse } from 'next/server';

const api = new WooCommerceRestApi({
  url: 'https://giveitbeans.cloudaccess.host/',
  consumerKey: process.env.WOO_LIVE_CONSUMER!,
  consumerSecret: process.env.WOO_LIVE_SECRET!,
  version: 'wc/v3',
});

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const res = await api.get(`products/${params.productId}`);
    return NextResponse.json(res.data);
  } catch (error) {
    // console.log(request.nextUrl.searchParams);
    return NextResponse.json({
      error: 'Something went wrong, please try again',
    });
  }
}

// { params }: { params: { productId: string } }
