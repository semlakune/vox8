"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"
import styled from "styled-components";
import Image from "next/image";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
      <ChevronRightIcon
          className={className}
          style={{ ...style, display: 'block', color: 'black', fontSize: '20px' }}
          onClick={onClick}
      />
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
      <ChevronLeftIcon
          className={className}
          style={{ ...style, display: 'block', color: 'black', fontSize: '20px' }}
          onClick={onClick}
      />
  );
}

const Hero = ({ loading, data }) => {
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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

  if (loading) return (
      <div className={"flex justify-center items-center px-3"}>
        <Skeleton className="w-[100%] h-[40vh]" />
      </div>
  )
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {data?.results.map((item, index) => (
          <Wrapper key={index} className={"px-3"}>
            <Card className={"hero-card"} onClick={() => router.push(`/detail/${item.group}/${item.id}`)}>
              <Image src={item.backdrop} alt={item.title || "Movie Poster"} width={1400} height={800} placeholder={"blur"} blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcZwsAAX8A3Uaf6mIAAAAASUVORK5CYII="} />
              <CardContent>
                <h1>{item.title + (item.release_date ? ` (${new Date(item.release_date).getFullYear()})` : '')}</h1>
              </CardContent>
            </Card>
          </Wrapper>
        )).slice(0, 10)}
      </Slider>
    </SliderWrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  
  .hero-card {
    width: 100%;
    height: 50vh;
    overflow: hidden;

    img {
      object-fit: cover;
      object-position: top;
      width: 100%;
      height: 100%;
      transition: all 0.5s ease-in-out;
    }

    &:hover {
      img {
        cursor: pointer;
        transform: scale(1.1);
        filter: brightness(0.5);
      }
    }

    @media (max-width: 768px) {
      height: 25vh;
    }
  }

  h1 {
    position: absolute;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%); 
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 20px #000;
    z-index: 1;
    text-align: center;
    padding: 0 1rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;


const SliderWrapper = styled.div`
  .slick-next:before,
  .slick-prev:before {
    color: #000;
    html.dark & {
      color: #fff;
    }
  }
  .dots_custom {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
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

export default Hero;
