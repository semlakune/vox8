"use client";
import {getOnTheAirTv} from "@/app/tv/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function OnTv() {
  return <ContentClientSide queryFn={getOnTheAirTv} queryKey={["on-tv"]} />
}