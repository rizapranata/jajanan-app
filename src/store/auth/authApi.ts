import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  ProfileUserResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    profile: builder.query<ProfileUserResponse, void>({
      query: () => ({
        url: "/me",
      }),
    }),
    changePassword: builder.mutation<
      { status: string; message: string },
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/change-password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useProfileQuery,
} = authApi;
