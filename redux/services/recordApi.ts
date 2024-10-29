import {
  LoginCredentials,
  LoginApiResponse,
  SignupCredentials,
  SignupApiResponse,
} from "@/types";

import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalRecords: builder.query<any, any>({
      query: (_arg = "") => ({
        url: `/extract/patient_data`,
      }),
    }),
    signup: builder.mutation<SignupApiResponse, SignupCredentials>({
      query: (credentials: SignupCredentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: (_arg = "") => {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");

        return {
          url: `/user/`,
          method: "GET",
          headers: access_token ? { AccessToken: access_token } : {},
        };
      },
      providesTags: ["User"],
    }),
    refreshAuth: builder.mutation<any, any>({
      query: (_arg = "") => {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");

        return {
          url: `/user/auth`,
          method: "GET",
          headers: refresh_token ? { RefreshToken: refresh_token } : {},
        };
      },
    }),
    logout: builder.mutation<any, any>({
      query: (_arg = "") => {
        const token = localStorage.getItem("access_token");

        return {
          url: "/user/logout",
          method: "GET",
          headers: token ? { AccessToken: token } : {},
        };
      },
    }),
  }),
});

export default userApi;
