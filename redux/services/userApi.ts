import {
  LoginCredentials,
  LoginApiResponse,
  SignupCredentials,
  SignupApiResponse,
} from "@/types";

import { baseApi } from "./baseApi";
import { setAuth, resetAuth } from "../slices/authSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupApiResponse, SignupCredentials>({
      query: (credentials: SignupCredentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuth({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
          // // Optionally save tokens to localStorage
          // localStorage.setItem("access_token", data.access_token);
          // localStorage.setItem("refresh_token", data.refresh_token);
        } catch (error) {
          // Handle error as needed
        }
      },
    }),
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setAuth({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
          // // Optionally save tokens to localStorage
          // localStorage.setItem("access_token", data.access_token);
          // localStorage.setItem("refresh_token", data.refresh_token);
        } catch (error) {
          // Handle error as needed
        }
      },
    }),
    getUser: builder.query({
      query: (_arg = "") => {
        return {
          url: `/user/`,
          method: "GET",
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
        return {
          url: "/user/logout",
          method: "GET",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(resetAuth());
          // Optionally save tokens to localStorage
          // localStorage.setItem("access_token", data.access_token);
          // localStorage.setItem("refresh_token", data.refresh_token);
        } catch (error) {
          // Handle error as needed
        }
      },
    }),
  }),
});

export default userApi;
