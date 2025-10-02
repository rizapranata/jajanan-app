export interface ProductGetAllResponse {
  status: string;
  data: Products[];
  count: number;
}
export interface ProductResponse {
  status: string;
  message: string;
  data: Products[];
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
export interface TagResponse {
  status: string;
  data: Tags[];
}
export interface Tags {
  _id: string;
  name: string;
  __v: number;
}

export interface CategoryResponse {
  status: string;
  data: Categories[];
}

export interface Categories {
  _id: string;
  name: string;
  __v: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductRequest {
  name: string;
  price: number;
  discount: number;
  image_url: File | null;
  category: string;
  tags: string[];
}
