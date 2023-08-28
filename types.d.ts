export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: { id: number; src: string; name: string; alt: string }[];
  // ... add other properties as needed
};
