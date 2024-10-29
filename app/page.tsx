"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();

  const access_token = useSelector((state: any) => state.auth.access_token);
  const refresh_token = useSelector((state: any) => state.auth.refresh_token);
  useEffect(() => {
    if (access_token && access_token !== "") {
      router.push("/medical-records");
    }
  }, []);
  return (
    <>
      <h1 className='text-3xl font-bold'>wellcome to extraction interface</h1>
      <Link href='/login'>Users</Link>
    </>
  );
};

export default Home;
