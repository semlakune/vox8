"use client";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import formatType from "@/lib/formatType";

export default function ContentLists({ type, group, data, loading, error, setPage }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 768);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className={"mx-3"}>
        {/*FILTER*/}
        {type === "search" ? null : (
            <Skeleton className={"w-[460px] h-[36px] m-[3px] rounded-[8px]"} />
        )}
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
      {type === "search" ? (
          <div>
            <h1 className={"text-sm font-bold"}>Search Results for : <em>{search}</em></h1>
          </div>
      ) : (
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
      )}
      {(isMobile && type !== "search") && (
          <div className={"m-2 border rounded-md py-2 px-3"}>{formatType(type)} {group === "movie" ? "Movies" : "TV/Series"}</div>
      )}
      {/*CONTENT*/}
      <ContentWrapper>
        {data?.results?.map((item, index) => {
          return (
            <div className={"flex flex-wrap laptop:flex-col mobile:flex-row items-start justify-start laptop:h-[420px] mobile:h-[280px]"} key={index}>
              <Card onClick={() => router.push(`/detail/${group ? group : item.group}/${item.id}`)}>
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
              <TitleWrapper>
                <h1 className={"text-sm font-bold cursor-pointer"} onClick={() => router.push(`/detail/${item.group}/${item.id}`)}>{item.title + (item.release_date ? ` (${new Date(item.release_date).getFullYear()})` : '')}</h1>
              </TitleWrapper>
            </div>
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
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
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
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 170px;
    height: 240px;
    margin: 10px;
  }

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

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 200px;
  margin: 0 20px;
  @media (max-width: 768px) {
    max-width: 180px;
    margin: 10px;
  }
  @media (max-width: 480px) {
    max-width: 100px;
  }
`;