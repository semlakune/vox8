"use client";
import React from "react";
import styled from "styled-components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContentLists({ type, group, data, loading, error, setPage }) {
  const router = useRouter();

  if (loading) {
    return (
      <div className={"mx-3"}>
        {/*FILTER*/}
        <Skeleton className={"w-[460px] h-[36px] m-[3px] rounded-[8px]"} />
        {/*CONTENT*/}
        <div className={"flex flex-wrap my-5"}>
          {[...Array(20)].map((_, index) => (
            <div className={"m-[10px]"} key={index}>
              <Skeleton className={"w-[205px] h-[300px] rounded-[8px]"} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/*FILTER*/}
      <TabsWrapper>
        <Tabs value={type} className="w-[200px]">
          <TabsList>
            <TabsTrigger value={group} className={"tab-title"} disabled>
              {group === "movie" ? "Movies" : "TV/Series"} <span>|</span>
            </TabsTrigger>
            {group === "movie" ? (
              <>
                <TabsTrigger
                  value="now-playing"
                  onClick={() => router.push("/movie/now_playing")}
                >
                  Now Playing
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  onClick={() => router.push("/movie/upcoming")}
                >
                  Upcoming
                </TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger
                  value="airing-today"
                  onClick={() => router.push("/tv/airing_today")}
                >
                  Airing Today
                </TabsTrigger>
                <TabsTrigger
                  value="on-the-air"
                  onClick={() => router.push("/tv/on_the_air")}
                >
                  On The Air
                </TabsTrigger>
              </>
            )}
            <TabsTrigger
              value="popular"
              onClick={() => router.push(`/${group}/popular`)}
            >
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="top-rated"
              onClick={() => router.push(`/${group}/top_rated`)}
            >
              Top Rated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </TabsWrapper>
      {/*CONTENT*/}
      <ContentWrapper>
        {data?.results?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Card onClick={() => router.push(`/detail/${group}/${item.id}`)}>
                <Image
                  src={item.poster}
                  alt={item.title || "Movie Poster"}
                  width={400}
                  height={600}
                  priority
                  blurDataURL={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcZwsAAX8A3Uaf6mIAAAAASUVORK5CYII="
                  }
                  placeholder={"blur"}
                />
                <div className={"vote-average"}>{item.vote_average}</div>
              </Card>
            </React.Fragment>
          );
        })}
      </ContentWrapper>
    </>
  );
}

const TabsWrapper = styled.div`
  margin: 12px 0 20px;
  padding-inline: 12px;

  .tab-title {
    opacity: 1 !important;
    color: #000000 !important;
    font-weight: 600 !important;
    html.dark & {
      color: #ffffff !important;
    }
    span {
      margin: 0 0 0 12px;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 205px;
  height: 300px;
  margin: 20px;
  //border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  //overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .vote-average {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    bottom: -10px;
    right: -10px;
    border-radius: 50%;
    background-color: rgb(255, 235, 0);
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    z-index: 1;
    overflow: visible;
    text-shadow: 0 0 10px #ffffff;
    box-shadow: 0 0 20px #ffffff;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
