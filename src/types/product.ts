export interface ProductRequest {
  status: string;
  message: string;
  data: Product;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  tags: any[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponse {
  status: string;
  data: Products[];
  count: number;
}

export interface Products {
  _id: string;
  price: number;
  discount: number;
  tags: Category[];
  name: string;
  category: Category;
  image_url: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
}

export interface ProductQueryParams {
  limit?: number;
  skip?: number;
  q?: string;
  category?: string;
  tags?: string[];
}
