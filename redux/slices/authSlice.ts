"use client";
import { LoginApiResponse, SignupApiResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { init } from "next/dist/compiled/webpack/webpack";
// import userApi from "../services/userApi";

const isClient = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export interface AuthState {
  access_token: string;
  refresh_token: string;
}

let initialState: AuthState | null = null;

if (isClient()) {
  if (!initialState) {
    initialState = {
      access_token: localStorage.getItem("access_token") || "",
      refresh_token: localStorage.getItem("refresh_token") || "",
    };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (state) {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
      }
    },
    refreshAuth: (state, action) => {
      if (state) {
        state.access_token = action.payload.new_access_token;
        localStorage.setItem("access_token", action.payload.new_access_token);
      }
    },
    resetAuth: (state) => {
      if (state) {
        state.access_token = "";
        state.refresh_token = "";
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    },
  },
  extraReducers(builder) {
    // builder.addMatcher(userApi.endpoints.login.matchPending, (state) => {});
    // builder.addMatcher(userApi.endpoints.signup.matchPending, (state) => {});
    // builder.addMatcher(
    //   userApi.endpoints.login.matchFulfilled,
    //   (state, { payload }: { payload: LoginApiResponse }) => {
    //     localStorage.setItem("access_token", payload.access_token);
    //     localStorage.setItem("refresh_token", payload.refresh_token);
    //     state.access_token = payload.access_token;
    //     state.refresh_token = payload.refresh_token;
    //   }
    // );
    // builder.addMatcher(
    //   userApi.endpoints.signup.matchFulfilled,
    //   (state, { payload }: { payload: SignupApiResponse }) => {
    //     localStorage.setItem("access_token", payload.access_token);
    //     localStorage.setItem("refresh_token", payload.refresh_token);
    //     state.access_token = payload.access_token;
    //     state.refresh_token = payload.refresh_token;
    //   }
    // );
    // builder.addMatcher(
    //   userApi.endpoints.login.matchRejected,
    //   (state, { payload }) => {}
    // );
    // builder.addMatcher(
    //   userApi.endpoints.logout.matchFulfilled,
    //   (state, { payload }) => {
    //     localStorage.setItem("access_token", "");
    //     localStorage.setItem("refresh_token", "");
    //     state.access_token = "";
    //     state.refresh_token = "";
    //   }
    // );
    // builder.addMatcher(
    //   userApi.endpoints.signup.matchRejected,
    //   (state, { payload }) => {}
    // );
  },
});

export const { setAuth, resetAuth, refreshAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
