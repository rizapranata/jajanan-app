import {
  CreateUserRequest,
  CreateUserResponse,
  DetailUserResponse,
  UsersResponse,
  UserType,
} from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => "api/users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<DetailUserResponse, string>({
      query: (id) => `api/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (body) => ({
        url: "api/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      CreateUserResponse,
      { id: string; body: CreateUserRequest }
    >({
      query: ({ id, body }) => ({
        url: `api/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateStatusUser: builder.mutation<
      UserType,
      { id: string; is_active: number }
    >({
      query: ({ id, is_active }) => ({
        url: `api/status/${id}`,
        method: "PUT",
        body: { is_active },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateStatusUserMutation,
} = userApi;
