import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">wellcome to extraction interface</h1>
      <Link href="/login">Users</Link>
    </>
  );
};

export default Home;
