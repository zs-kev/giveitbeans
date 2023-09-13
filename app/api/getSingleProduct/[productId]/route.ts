import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextRequest, NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';

const api = new WooCommerceRestApi({
  url: 'https://giveitbeans.cloudaccess.host/',
  consumerKey: process.env.NEXT_PUBLIC_WOO_LIVE_CONSUMER!,
  consumerSecret: process.env.NEXT_PUBLIC_WOO_LIVE_SECRET!,
  version: 'wc/v3',
});

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const res = await api.get(`products/${params.productId}`);

    // Sanitize the product description
    if (res.data.description) {
      res.data.description = sanitizeHtml(res.data.description, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      });
    }

    // Check if there are product variations
    if (res.data.type === 'variable') {
      const variationsRes = await api.get(
        `products/${params.productId}/variations`
      );
      //Append variations to the original data
      res.data.variationDetails = variationsRes.data.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
    }

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({
      error: 'Something went wrong, please try again',
    });
  }
}
