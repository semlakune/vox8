"use client";
import {getTopRatedMovie} from "@/app/movie/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function TopRated() {
  return <ContentClientSide queryFn={getTopRatedMovie} queryKey={["top-rated-movie"]} />
}