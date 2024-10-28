import {
  LoginCredentials,
  LoginApiResponse,
  SignupCredentials,
  SignupApiResponse,
} from "@/types";

import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
        headers: {
          "Allow-Origin": "*",
        },
      }),
    }),

    signup: builder.mutation<SignupApiResponse, SignupCredentials>({
      query: (credentials: SignupCredentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: (_arg = "") => `/user/`,
      providesTags: ["User"],
    }),

    // forgotPassword: builder.mutation<
    //   forgotpasswordotpApiResponse,
    //   forgotpasswordotp
    // >({
    //   query: (credentials: forgotpasswordotp) => {
    //     return {
    //       url: `/Authentication/forgotPassword`,
    //       method: "POST",
    //       body: credentials,
    //     };
    //   },
    // }),

    // verifyRegistrationAccount: builder.mutation<
    //   verifyRegistrationAccontApiResponse,
    //   verifyRegistrationAccountInput
    // >({
    //   query: (input: verifyRegistrationAccountInput) => ({
    //     url: "/OTP/VerifyRegistrationOTP",
    //     method: "POST",
    //     body: {
    //       email: input.email,
    //       otpCode: input.otpCode,
    //     },
    //   }),
    // }),
    // verifyRecoveryAccount: builder.mutation<
    //   verifyRecoveryAccontApiResponse,
    //   verifyRecoveryAccountInput
    // >({
    //   query: (input: verifyRecoveryAccountInput) => ({
    //     url: "/OTP/VerifyRecoveryOTP",
    //     method: "POST",
    //     body: {
    //       email: input.email,
    //       otpCode: input.otpCode,
    //     },
    //   }),
    // }),
    // createRegistrationOTP: builder.mutation<
    //   createRegistrationOTPApiResponse,
    //   createRegistrationOTPInput
    // >({
    //   query: (input: createRegistrationOTPInput) => ({
    //     url: "/OTP/CreateRegistrationOTP",
    //     method: "POST",
    //     body: {
    //       email: input.email,
    //     },
    //   }),
    // }),
    // createRecoveryOTP: builder.mutation<
    //   createRecoveryOTPApiResponse,
    //   createRecoveryOTPInput
    // >({
    //   query: (input: createRecoveryOTPInput) => ({
    //     url: "/OTP/CreateRecoveryOTP",
    //     method: "POST",
    //     body: {
    //       email: input.email,
    //     },
    //   }),
    // }),

    // resetPassword: builder.mutation<resetPasswordApiResponse, resetPassword>({
    //   query: (credentials: resetPassword) => ({
    //     url: "/Authentication/resetPassword",
    //     method: "POST",
    //     body: credentials,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("resetToken")}`,
    //     },
    //   }),
    // }),
    logout: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/Authentication/logout",
        method: "POST",
        body: { refreshToken: payload.refreshToken },
      }),
    }),
  }),
});

export default userApi;
