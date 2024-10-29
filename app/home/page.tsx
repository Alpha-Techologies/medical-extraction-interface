import React from "react";
import Image from "next/image";
import Features from "./features";
import Header from "./header";
import HeroSection from "./heroSection";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-yellow-50/50">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex flex-col space-y-10">
        {/* Hero Section  */}
        <HeroSection />

        {/* Features */}
        <Features />
      </main>
    </div>
  );
};

export default HomePage;
