import userApi from "../services/userApi";

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetUserQuery,
} = userApi;
