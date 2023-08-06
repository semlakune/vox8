"use client";
import { Navbar } from "@/components/sections/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import { useEffect, useState } from "react";
import NowPlayingSection from "@/components/sections/NowPlaying/NowPlaying";
import PopularSection from "@/components/sections/Popular/Popular";

function Home() {
  const [dataHome, setDataHome] = useState([]);

  const fetchHomeData = async () => {
    const nowPlaying = await fetch(
      process.env.NEXT_PUBLIC_VOX8_API + "movies/now_playing",
    );
    const popular = await fetch(
      process.env.NEXT_PUBLIC_VOX8_API + "movies/popular",
    );
    const topRated = await fetch(
      process.env.NEXT_PUBLIC_VOX8_API + "movies/top_rated",
    );
    const upcoming = await fetch(
      process.env.NEXT_PUBLIC_VOX8_API + "movies/upcoming",
    );
    const nowPlayingData = await nowPlaying.json();
    const popularData = await popular.json();
    const topRatedData = await topRated.json();
    const upcomingData = await upcoming.json();
    return { nowPlayingData, popularData, topRatedData, upcomingData };
  };

  useEffect(() => {
    fetchHomeData().then((data) => setDataHome(data));
  }, []);

  console.log(dataHome);

  return (
    <div>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
        <Hero />
        {/* SECTION NOW PLAYING */}
        <NowPlayingSection data={dataHome} />
        {/* SECTION POPULAR */}
        <PopularSection data={dataHome} />
        {/* SECTION TOP RATED */}
        {/* SECTION UPCOMING */}
      </div>
    </div>
  );
}

export default Home;
