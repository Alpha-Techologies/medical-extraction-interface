"use client";

import AuthBackground from "@/components/auth/AuthBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const access_token = useSelector((state: any) => state.auth.access_token);
  const refresh_token = useSelector((state: any) => state.auth.refresh_token);

  console.log(access_token, refresh_token, "the token sin redux");

  useEffect(() => {
    if (access_token && access_token !== "") {
      router.push("/medical-records");
    }
  }, []);
  return (
    <main className={``}>
      <div className={` flex h-full w-full`}>
        <div className={"lg:w-[35%] w-full"}>{children}</div>
        <div className='w-[75%] hidden lg:block'>
          <AuthBackground />
        </div>
      </div>
    </main>
  );
}
