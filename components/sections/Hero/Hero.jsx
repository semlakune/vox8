"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import styled from "styled-components";
import {useTheme} from "next-themes";

const Wrapper = styled.div`
  .hero-card {
    width: 100%;
    height: 30vh;
    background-image: url(${({ $backdrop }) => ($backdrop ? $backdrop : null)});
    filter: brightness(0.8);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      height: 25vh;
    }
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 10px #000;
    z-index: 1;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const SliderWrapper = styled.div`
  .dots_custom {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
    padding: 0;
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }

  .dots_custom li button {
    border: none;
    background: #d1d1d1;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 5px;
    width: 5px;
    border-radius: 100%;
    padding: 0;
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease; /* Elastic effect for scale, smooth for opacity */
    html.dark & {
      background: #696969;
    }
  }

  .dots_custom li.slick-active button {
    background-color: #000;
    width: 10px;
    height: 5px;
    border-radius: 20px;
    transform: scale(1.5); /* Scale the dot up */
    opacity: 1; /* Make the dot fully visible */
    
    html.dark & {
      background: #fff;
    }
  }

  .dots_custom li:not(.slick-active) button {
    transform: scale(1); /* Keep the dot at its normal scale */
    opacity: 0.7; /* Make the dot slightly transparent */
  }
`;

const Hero = () => {
  const { theme } = useTheme();
  const [dataHero, setDataHero] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          // bottom: '24px',
          top: "105%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_VOX8_API + "movies/popular")
      .then((res) => res.json())
      .then((data) => setDataHero(data?.results?.slice(0, 5)));
  }, []);


  return (
    <SliderWrapper theme={theme}>
      <Slider {...settings}>
        {dataHero?.map((movie, index) => (
          <Wrapper key={index} className={"px-3"} $backdrop={movie.backdrop}>
            <Card className={"hero-card"}>
              <CardContent>
                <h1>{movie.title}</h1>
              </CardContent>
            </Card>
          </Wrapper>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default Hero;
