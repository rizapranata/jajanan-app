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
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Product", id: "LIST" },
              ...result.data.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getTags: builder.query<TagResponse, void>({
      query: () => ({
        url: "api/tags",
      }),
    }),
    createProduct: builder.mutation<ProductResponse, FormData>({
      query: (body) => ({
        url: "api/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getDetailById: builder.query<ProductDetailResponse, string>({
      query: (id) => `api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
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
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id }, // ✅ invalidate detail product
        { type: "Product", id: "LIST" }, // ✅ invalidate daftar product
      ],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useLazyGetDetailByIdQuery,
} = productApi;
