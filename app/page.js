"use client";
import { Navbar } from "@/components/Navbar/Navbar";
import Hero from "@/components/Home/Hero/Hero";
import { useState } from "react";
import PopularSection from "@/components/Home/Popular/Popular";
import useTrending from "@/api/useTrending";
import TopRated from "@/components/Home/TopRated/TopRated";
import Footer from "@/components/Footer/Footer";

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
        <TopRated />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

export default Home;
