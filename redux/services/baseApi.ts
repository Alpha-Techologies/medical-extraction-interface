import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { HYDRATE } from "next-redux-wrapper";

/**
 * The base API config for making API requests.
 */

const baseURL = "localhost";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers) => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessTokenExpiryDate = localStorage.getItem(
        "accessTokenExpiryDate"
      );
      const refreshTokenExpiryDate = localStorage.getItem(
        "refreshTokenExpiryDate"
      );

      if (accessTokenExpiryDate && refreshTokenExpiryDate) {
        if (moment(accessTokenExpiryDate).isBefore(moment())) {
          const refreshResponse = await fetch(
            `${baseURL}/Authentication/refreshToken`,
            {
              method: "POST",
              body: JSON.stringify({ refreshToken }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const { data } = await refreshResponse.json();

          if (data) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refresh_Token);
            localStorage.setItem(
              "accessTokenExpiryDate",
              data.access_Token_Expiry_Date
            );
            localStorage.setItem(
              "refreshTokenExpiryDate",
              data.refresh_Token_Expiry_Date
            );
            // document.cookie = `token=${data.accessToken}; path=/; expires=${data.refresh_Token_Expiry_Date}`;
            // document.cookie = `refreshToken=${data.refresh_Token}; path=/; expires=${data.refresh_Token_Expiry_Date}`;
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessTokenExpiryDate");
            localStorage.removeItem("refreshTokenExpiryDate");
            // document.cookie =
            //   "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            // document.cookie =
            //   "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.href = "/auth/login";
          }
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpiryDate");
        localStorage.removeItem("refreshTokenExpiryDate");
        // document.cookie =
        //   "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        // document.cookie =
        //   "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        // window.location.href = '/auth/login';
        if (
          !window.location.pathname.startsWith("/auth") &&
          !window.location.pathname.startsWith("/")
        ) {
          window.location.href = "/auth/login";
        }
      }

      headers.set("Content-Type", "application/json");
      const token = decodeURIComponent(document.cookie)
        .split(";")
        .find((c) => c.trim().startsWith("token="))
        ?.split("=")[1];
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return (action.payload as any)[reducerPath];
    }
  },
  tagTypes: ["StartupAchievement", "StartupTeamMembers"],
  endpoints: () => ({}),
});

export default baseApi;
