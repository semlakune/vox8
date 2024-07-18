"use client";
import {getNowPlayingMovie} from "@/app/movie/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function NowPlaying() {
  return (
    <ContentClientSide queryFn={getNowPlayingMovie} queryKey={["now-playing-movie"]} />
  )
}