"use client";
import {getUpcomingMovie} from "@/app/movie/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function Upcoming() {
  return <ContentClientSide queryFn={getUpcomingMovie} queryKey={["upcoming-movie"]} />
}