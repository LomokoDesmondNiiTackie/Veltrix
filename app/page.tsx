"use client";

import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import TrustedBy from "@/components/home/trustedBy";
import DeepFeatureFocus from "@/components/home/deepFeatureFocus";
import Navbar from "@/components/layout/navbar";
import Testimonials from "@/components/home/testimonials";
import LiveBoardPreview from "@/components/home/liveBoardPreview";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div
      className="
        relative
        h-screen w-full min-h-screen
        bg-[linear-gradient(0deg,transparent_50%,rgba(107,114,128,0.05)_50%),linear-gradient(90deg,transparent_50%,rgba(107,114,128,0.05)_50%)]
        [background-size:calc(0.36rem*51)_calc(0.36rem*51)]
        bg-[#f5f5f5]   /* base background color */
      "
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f5f5] pointer-events-none" />

      <div className=" w-full relative z-10 flex flex-col justify-center items-center">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Features />
        <DeepFeatureFocus />
        <Testimonials />
        <LiveBoardPreview />
        <Footer />
      </div>
    </div>
  );
}
