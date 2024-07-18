"use client";
import {getTopRatedTv} from "@/app/tv/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function TopRated() {
  return <ContentClientSide queryFn={getTopRatedTv} queryKey={["top-rated-tv"]} />
}