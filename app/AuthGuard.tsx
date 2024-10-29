"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const access_token = useSelector(
    (state: RootState) => state?.auth?.access_token
  );
  const refresh_token = useSelector(
    (state: RootState) => state?.auth?.refresh_token
  );

  useEffect(() => {
    // Redirect to login if tokens are missing
    if (!access_token || !refresh_token) {
      router.push("/home");
    }
  }, [access_token, refresh_token, router]);

  // Render children only if both tokens are present
  //   if (!access_token || !refresh_token) {
  //     return null; // Optionally, show a loading spinner here
  //   }

  return <>{children}</>;
};

export default AuthGuard;
