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
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("is it here", result);
  // const router = useRouter();

  if (result.error && result.error.status === 401) {
    console.log("error", result.error);
    // Handle token refresh logic here
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

    const { data } = await refreshResponse.json();
    console.log(data, " the data");

    if (data) {
      localStorage.setItem("access_token", data.new_access_token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("why not");
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
