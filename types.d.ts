export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: { id: number; src: string; name: string; alt: string }[];
};

export type DefaultAddress = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  province: string;
  postcode: string;
  phone: string;
};
