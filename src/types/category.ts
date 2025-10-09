export interface CategoryResponse {
  status: string;
  data: Category[];
}

export interface Category {
  _id: string;
  name: string;
  __v: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryRequest {
  name: string;
}

export interface CategoryCreateResponse {
    status: string;
    data:   CategoryData;
}

export interface CategoryData {
    name:      string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

