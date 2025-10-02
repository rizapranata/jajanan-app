import {
  CategoryResponse,
  ProductGetAllResponse,
  ProductQueryParams,
  ProductRequest,
  ProductResponse,
  TagResponse,
} from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductGetAllResponse, ProductQueryParams>({
      query: ({ limit = 10, skip = 0, q = "", category = "", tags = [] }) => ({
        url: "api/products",
        params: { limit, skip, category, q, tags },
      }),
      providesTags: ["Product"],
    }),
    getTags: builder.query<TagResponse, void>({
      query: () => ({
        url: "api/tags",
      }),
    }),
    getCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "api/categories",
      }),
    }),
    createProduct: builder.mutation<ProductResponse, FormData>({
      query: (body) => ({
        url: "api/products",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useCreateProductMutation,
} = productApi;
