import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalRecords: builder.query<any, any>({
      query: (_arg = "") => ({
        url: `/extract/patient_data`,
      }),
    }),
  }),
});

export default userApi;
