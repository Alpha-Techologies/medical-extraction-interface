"use client";

import AuthBackground from "@/components/auth/AuthBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    // console.log(access_token, "access_token inlayout");

    if (access_token && access_token !== "") {
      router.push("/medical-records");
    }
  }, []);
  return (
    <main className={``}>
      <div className={` flex h-full w-full`}>
        <div className={"lg:w-[35%] w-full"}>{children}</div>
        <div className="w-[75%] hidden lg:block">
          <AuthBackground />
        </div>
      </div>
    </main>
  );
}
