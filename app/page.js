"use client";
import { Navbar } from "@/components/sections/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useTheme} from "next-themes";

function Home() {
  const scrollerRef = useRef(null);
  const { theme } = useTheme();
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
    const scroller = scrollerRef.current;
    const container = scroller.parentNode;

    const handleScroll = () => {
      // Remove any existing classes to reset the gradients
      container.classList.remove('show-left-gradient', 'show-right-gradient');

      if (scroller.scrollLeft > 0) {
        container.classList.add('show-left-gradient');
      }

      if (scroller.scrollLeft < (scroller.scrollWidth - scroller.offsetWidth)) {
        container.classList.add('show-right-gradient');
      }
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll();  // Check initial position

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    fetchHomeData().then((data) => setDataHome(data));
  }, []);
  console.log(dataHome);
  return (
    <div>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl"}>
        <Hero />
        {/* SECTION NOW PLAYING */}
        <ScrollerContainer theme={theme}>
          <ScrollerWrapper ref={scrollerRef}>
            {dataHome.nowPlayingData?.results?.map((movie) => (
                <div className={"flex flex-col flex-wrap"} key={movie.id}>
                  <Card poster={movie.poster} />
                  <div className={"max-w-[200px] whitespace-pre-wrap px-3"}>
                    <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                  </div>
                </div>
            ))}
          </ScrollerWrapper>
        </ScrollerContainer>
      </div>
    </div>
  );
}

const ScrollerContainer = styled.div`
  position: relative;
  padding: 0 2px;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    pointer-events: none;
    z-index: 2;
    visibility: hidden;  // Start with the gradients hidden
  }

  &::before {
    left: 0;
    background: ${({theme}) => theme === 'dark' ? 'linear-gradient(to right, #121212, rgba(0, 0, 0, 0))' : 'linear-gradient(to right, #fff, rgba(255, 255, 255, 0))'};
  }

  &::after {
    right: 0;
    background: ${({theme}) => theme === 'dark' ? 'linear-gradient(to left, #121212, rgba(0, 0, 0, 0))' : 'linear-gradient(to left, #fff, rgba(255, 255, 255, 0))'};
  }

  &.show-left-gradient::before {
    visibility: visible;
  }

  &.show-right-gradient::after {
    visibility: visible;
  }
`;



const ScrollerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  margin-top: 40px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  h1 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;



// Card Component
const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  margin: 10px;
  background-color: #fff;
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export default Home;
