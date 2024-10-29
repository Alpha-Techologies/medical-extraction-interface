import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../store";
import { setAuth, resetAuth } from "../slices/authSlice";
import Router from "next/router";
import { Mutex } from "async-mutex";

const baseURL = process.env.BACKEND_URL || "http://localhost:5000";
console.log("baseURL", baseURL);

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const access_token = store.getState().auth.access_token;

    if (access_token) {
      headers.set("AccessToken", access_token);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  // const router = useRouter();

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const access_token = store.getState().auth.access_token;
      const refresh_token = store.getState().auth.refresh_token;
      console.log(
        refresh_token,
        access_token,
        "the accessToken",
        "the refreshToken"
      );

      try {
        const refreshResponse = await fetch(`http://localhost:5000/user/auth`, {
          method: "GET",
          headers: {
            RefreshToken: refresh_token || "",
            AccessToken: access_token || "",
          },
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();

          if (data && data.new_access_token) {
            // Save the new token in the store
            store.dispatch(
              setAuth({ new_access_token: data.new_access_token })
            );

            result = await baseQuery(args, api, extraOptions);
          } else {
            throw new Error("Token refresh failed");
          }
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        store.dispatch(resetAuth());
        Router.push("/login");
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "baseApi",
  tagTypes: ["User"],
  endpoints: () => ({}),
});
