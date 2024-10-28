"use client";
import { LoginApiResponse, SignupApiResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/userApi";

import { getExpirationDate } from "@/lib/date";
// import localStorage from 'redux-persist/es/storage';

export interface AuthState {
  token: string;
  isVerified: boolean;
  success: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
  userProfile?: string;
  userEmail?: string;
  phoneNumber?: string;
  error: any | null;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryDate: string;
  accessTokenExpiryDate: string;
}

let initialState: AuthState = {
  token: "",
  userEmail: "",
  success: false,
  isVerified: false,
  isAuthenticated: false,
  isLoading: false,
  userId: "",
  userName: "",
  userRole: "",
  userProfile: "",
  error: null,
  phoneNumber: "",
  accessToken: "",
  refreshToken: "",
  refreshTokenExpiryDate: "",
  accessTokenExpiryDate: "",
};

if (typeof window !== "undefined") {
  // Perform localStorage action

  const data = localStorage.getItem("auth");
  if (data) {
    initialState = JSON.parse(data);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.error = null;
      state.token = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.userId = "";
      state.userName = "";
      state.userRole = "";
      state.userProfile = "";
      state.userEmail = "";
      state.phoneNumber = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.refreshTokenExpiryDate = "";
      state.accessTokenExpiryDate = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenExpiryDate");
      localStorage.removeItem("accessTokenExpiryDate");
    },
    setAuth: (state, { payload }) => {
      state.error = payload.error;
      state.isAuthenticated = payload.isAuthenticated;
      state.isLoading = payload.isLoading;
      state.token = payload.accessToken;
      state.userEmail = payload.userEmail;
      state.userId = payload.userId;
      state.userRole = payload.userRole;
      // state.userProfile = payload.userProfile;
      // state.userName = payload.userName;
    },
    setTokens: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refresh_Token;
      state.refreshTokenExpiryDate = payload.refresh_Token_Expiry_Date;
      state.accessTokenExpiryDate = payload.access_Token_Expiry_Date;
    },
    clearTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.refreshTokenExpiryDate = "";
      state.accessTokenExpiryDate = "";
    },
    setUserProfile: (state, { payload }) => {
      state.userName = payload.startupName;
      state.userProfile = payload.imageLogo;
      state.phoneNumber = payload.phoneNumber;
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.login.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(userApi.endpoints.signup.matchPending, (state) => {
      state.isLoading = true;
    });

    // builder.addMatcher(userApi.endpoints.firebase.matchPending, (state) => {
    //   state.isLoading = true;
    // });

    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }: { payload: LoginApiResponse }) => {
        localStorage.setItem("access_token", payload.access_token);
        localStorage.setItem("refresh_token", payload.refresh_token);
      }
    );

    // builder.addMatcher(
    //   userApi.endpoints.verifyRegistrationAccount.matchFulfilled,
    //   (
    //     state,
    //     { payload }: { payload: verifyRegistrationAccontApiResponse }
    //   ) => {
    //     state.token = payload.accessToken;
    //     state.userId = payload.id;
    //     state.userEmail = payload.email;
    //     state.isAuthenticated = true;
    //     state.isLoading = false;
    //     state.accessToken = payload.accessToken;
    //     state.refreshToken = payload.refresh_Token;
    //     state.refreshTokenExpiryDate = payload.refresh_Token_Expiry_Date;
    //     state.accessTokenExpiryDate = payload.access_Token_Expiry_Date;
    //     document.cookie = `token=${
    //       payload.accessToken
    //     }; path=/; expires=${getExpirationDate()}`;
    //     document.cookie = `refreshToken=${
    //       payload.refresh_Token
    //     }; path=/; expires=${getExpirationDate()}`;
    //   }
    // );

    builder.addMatcher(
      userApi.endpoints.signup.matchFulfilled,
      (state, { payload }: { payload: SignupApiResponse }) => {
        state.isLoading = false;
        localStorage.setItem("access_token", payload.access_token);
        localStorage.setItem("refresh_token", payload.refresh_token);
      }
    );

    builder.addMatcher(
      userApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    );

    builder.addMatcher(
      userApi.endpoints.signup.matchRejected,
      (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    );
    // builder.addMatcher(
    //   userApi.endpoints.verifyRecoveryAccount.matchRejected,
    //   (state, { payload }) => {
    //     state.error = payload;
    //     state.isLoading = false;
    //     localStorage.removeItem("resetToken");
    //   }
    // );
    // builder.addMatcher(
    //   userApi.endpoints.verifyRecoveryAccount.matchFulfilled,
    //   (state, { payload }) => {
    //     state.error = payload;
    //     state.isLoading = false;
    //     localStorage.setItem("resetToken", payload?.data?.resetToken);
    //   }
    // );
  },
});

export const { resetAuth, setAuth, setUserProfile, setTokens, clearTokens } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
