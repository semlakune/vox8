"use client";
import ContentClientSide from "@/app/_components/content-client-side";
import {getPopularTv} from "@/app/tv/actions";

export default function Popular() {
  return <ContentClientSide queryFn={getPopularTv} queryKey={["popular-tv"]} />
}