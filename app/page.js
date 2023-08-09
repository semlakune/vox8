"use client";
import { Navbar } from "@/components/sections/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import { useState } from "react";
import PopularSection from "@/components/sections/Popular/Popular";
import useTrending from "@/api/useTrending";

function Home() {
  const [time, setTime] = useState("day");

  const {dataTrending, isLoadingTrending, isErrorTrending} = useTrending(time);

  return (
    <div>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
        <Hero loading={isLoadingTrending} error={isErrorTrending} data={dataTrending} />
        {/* SECTION POPULAR */}
        <PopularSection />
        {/* SECTION TOP RATED */}
      </div>
    </div>
  );
}

export default Home;
