import { TagResponse } from "@/types/product";
import { TagCreateRequest, TagCreateResponse } from "@/types/tag";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagApi = createApi({
  reducerPath: "tagApi",
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
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getTags: builder.query<TagResponse, void>({
      query: () => ({
        url: "api/tags",
      }),
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation<TagCreateResponse, TagCreateRequest>({
      query: (body) => ({
        url: "api/tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation<{ message: string; error: number }, string>({
      query: (id) => ({
        url: `api/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const { useDeleteTagMutation, useCreateTagMutation, useGetTagsQuery } =
  tagApi;
