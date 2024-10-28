import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { redirect } from "next/navigation";
// import Router from "next/router";
// import { useRouter } from "next/navigation";
/**
 * The base API config for making API requests.
 */

const baseURL = process.env.BACKEND_URL || "http://localhost:5000";
console.log("baseURL", baseURL);

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      headers.set("AccessToken", access_token);
    }
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  // const router = useRouter();

  if (result.error && result.error.status === 401) {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    console.log(refresh_token, "the refreshToken");

    const refreshResponse = await fetch(`http://localhost:5000/user/auth`, {
      method: "GET",
      headers: {
        RefreshToken: refresh_token || "",
        AccessToken: access_token || "",
      },
    });

    const data = await refreshResponse.json();

    if (data) {
      localStorage.setItem("access_token", data.new_access_token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      redirect("/login");
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
