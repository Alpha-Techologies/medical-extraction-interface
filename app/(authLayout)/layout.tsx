"use client";

import AuthBackground from "@/components/auth/AuthBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const isCreateProfilePage = pathname === "/auth/create-profile";

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
