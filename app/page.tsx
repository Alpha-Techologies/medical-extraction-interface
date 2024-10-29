"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    if (access_token && access_token !== "") {
      router.push("/medical-records");
    }
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold">wellcome to extraction interface</h1>
      <Link href="/login">Users</Link>
    </>
  );
};

export default Home;
