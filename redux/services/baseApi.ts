import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { HYDRATE } from "next-redux-wrapper";

/**
 * The base API config for making API requests.
 */

const baseURL = process.env.BACKEND_URL || "http://localhost:5000";
console.log("baseURL", baseURL);

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["User"],
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return (action.payload as any)[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});

export default baseApi;
