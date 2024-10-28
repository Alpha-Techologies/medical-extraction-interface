"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoginCredentials, SignupCredentials } from "@/types";

import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from "@/redux/features/user";
import { resetAuth, selectAuth } from "@/redux/slices/authSlice"; // to manage the authentication state in the Redux store.
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  // hook variables
  const dispatch = useDispatch();
  // const cookies = useCookies();
  const router = useRouter();

  // auth handlers
  const [logout] = useLogoutMutation();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  return {
    loginHandler: async (credentials: LoginCredentials) => {
      try {
        return await login(credentials);
      } catch (error) {
        return null;
      }
    },
    logoutHandler: async (payload: any) => {
      localStorage.removeItem("auth");
      // cookies.set("token", "");
      const resp = await logout(payload);

      dispatch(resetAuth());
      router.refresh();
      router.push("/auth/login");

      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      return resp;
    },
    signupHandler: async (credentials: SignupCredentials) => {
      try {
        return await signup(credentials);
      } catch (error) {
        return null;
      }
    },
    // firebaseHandler: async ({ fbToken, userType }: FirebaseCredentials) => {
    //   try {
    //     const credentials = { fbToken, userType };
    //     return await firebase(credentials);
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // verifyRegistrationAccountHandler: async (
    //   inputs: verifyRegistrationAccountInput
    // ) => {
    //   try {
    //     setIsVerification(true);

    //     return await verifyRegistrationAccount(inputs);
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // verifyRecoveryAccountHandler: async (
    //   inputs: verifyRecoveryAccountInput
    // ) => {
    //   try {
    //     setIsVerification(true);

    //     return await verifyRecoveryAccount(inputs);
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // forgotPasswordHandler: async (credentials: forgotpasswordotp) => {
    //   try {
    //     return await forgotPassword(credentials);
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // resetPasswordHandler: async (credentials: resetPassword) => {
    //   try {
    //     return await ResetPassword(credentials);
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // createRegistrationOTPHandler: async (email: string) => {
    //   try {
    //     return await createRegistrationOTP({ email });
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // createRecoveryOTPHandler: async (email: string) => {
    //   try {
    //     return await createRecoveryOTP({ email });
    //   } catch (error) {
    //     return null;
    //   }
    // },
    // joinWaitlistHandler: async (payload: WaitlistCredentials) => {
    //   try {
    //     return await joinWaitlist(payload);
    //   } catch (error) {
    //     return error;
    //   }
    // },
  };
};
