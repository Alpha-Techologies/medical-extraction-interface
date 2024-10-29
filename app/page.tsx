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
    } else {
      router.push("/home");
    }
  }, []);
  return <></>;
};

export default Home;
