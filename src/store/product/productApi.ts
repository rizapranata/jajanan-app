import {
  CategoryResponse,
  ProductDetailResponse,
  ProductGetAllResponse,
  ProductQueryParams,
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
    getDetailById: builder.query<ProductDetailResponse, string>({
      query: (id) => `api/products/${id}`,
      providesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ message: string; error: number }, string>(
      {
        query: (id) => ({
          url: `api/products/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Product"],
      }
    ),
    updateProduct: builder.mutation<
      ProductResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `api/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useLazyGetDetailByIdQuery,
} = productApi;
