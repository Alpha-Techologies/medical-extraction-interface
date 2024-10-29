"use client";
import { LoginApiResponse, SignupApiResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/userApi";

// import Router from "next/router";
import { useRouter } from "next/navigation";

export interface AuthState {
  access_token: string;
  refresh_token: string;
}

let initialState: AuthState = {
  access_token: "",
  refresh_token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.access_token = action.payload.new_access_token;
    },
    resetAuth: (state) => {
      state.access_token = "";
      state.refresh_token = "";
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.login.matchPending, (state) => {});
    builder.addMatcher(userApi.endpoints.signup.matchPending, (state) => {});

    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }: { payload: LoginApiResponse }) => {
        localStorage.setItem("access_token", payload.access_token);
        localStorage.setItem("refresh_token", payload.refresh_token);
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
      }
    );

    builder.addMatcher(
      userApi.endpoints.signup.matchFulfilled,
      (state, { payload }: { payload: SignupApiResponse }) => {
        localStorage.setItem("access_token", payload.access_token);
        localStorage.setItem("refresh_token", payload.refresh_token);
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
      }
    );

    builder.addMatcher(
      userApi.endpoints.login.matchRejected,
      (state, { payload }) => {}
    );
    builder.addMatcher(
      userApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        state.access_token = "";
        state.refresh_token = "";
      }
    );

    builder.addMatcher(
      userApi.endpoints.signup.matchRejected,
      (state, { payload }) => {}
    );
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
