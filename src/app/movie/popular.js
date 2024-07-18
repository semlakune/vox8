"use client";
import {getPopularMovie} from "@/app/movie/actions";
import ContentClientSide from "@/app/_components/content-client-side";


export default function Popular() {
  return (
    <ContentClientSide queryFn={getPopularMovie} queryKey={["popular-movie"]} />
  )
}