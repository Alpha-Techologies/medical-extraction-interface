// import store from "../store";
// import { setAuth, resetAuth } from "../slices/authSlice";
import { Mutex } from "async-mutex";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { refreshAuth, resetAuth } from "../slices/authSlice";

const baseURL = process.env.BACKEND_URL || "http://localhost:5000";
// console.log("baseURL", baseURL);

const mutex = new Mutex();

const fetchWithTimeout = async (
  input: any,
  init?: any,
  timeout: number = 35000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      toast.error("Request timed out!");
      throw new Error("timeout");
    } else if (error instanceof TypeError) {
      toast.error("Please, Connect to the internet and try again.");
      throw new Error("timeout");
    }
    throw error;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }: any) => {
    const access_token = getState()?.auth?.access_token;
    const refresh_token = getState()?.auth?.refresh_token;

    if (access_token) {
      headers.set("AccessToken", access_token);
      headers.set("RefreshToken", refresh_token);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  // const router = useRouter();

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const access_token = api.getState().auth.access_token;
      const refresh_token = api.getState().auth.refresh_token;
      // console.log("reauth");

      try {
        const refreshResponse = await fetch(`http://localhost:5000/user/auth`, {
          method: "GET",
          headers: {
            RefreshToken: refresh_token || "",
            AccessToken: access_token || "",
          },
        });
        // console.log(refreshResponse);

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();

          if (data && data.new_access_token) {
            // Save the new token in the store
            api.dispatch(
              refreshAuth({ new_access_token: data.new_access_token })
            );

            result = await baseQuery(args, api, extraOptions);
          } else {
            throw new Error("Token refresh failed");
          }
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        api.dispatch(resetAuth());
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
  tagTypes: ["User", "Records"],
  endpoints: () => ({}),
});
