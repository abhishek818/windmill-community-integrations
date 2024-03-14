import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

type WooCommerce = {
  url: string;
  consumerKey: string;
  consumerSecret: string;
  version: string;
  queryStringAuth?: boolean;
};

type ProductData = {
  name: string;
  type: 'simple' | 'variable';
  regular_price?: string;
  description?: string;
  short_description?: string;
  categories?: { id: number }[];
  images?: { src: string }[];
  attributes?: {
    id: number;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  default_attributes?: {
    id: number;
    option: string;
  }[];
};

export async function main(resource: WooCommerce, product: ProductData) {
  const WooCommerce = new WooCommerceRestApi({
    url: resource.url,
    consumerKey: resource.consumerKey,
    consumerSecret: resource.consumerSecret,
    version: resource.version,
    queryStringAuth: resource.queryStringAuth,
  });

  try {
    const response = await WooCommerce.post('products', product);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data || 'Internal Server Error',
    }
  }
}
