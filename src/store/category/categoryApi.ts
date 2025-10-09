import { CategoryRequest } from "@/types/category";
import { CategoryResponse } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "api/categories",
      }),
    }),
    createCategory: builder.mutation<CategoryResponse, CategoryRequest>({
      query: (body) => ({
        url: "api/categories",
        method: "POST",
        body,
      }),
    }),
    deleteCategory: builder.mutation<
      { message: string; error: number },
      string
    >({
      query: (id) => ({
        url: `api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
