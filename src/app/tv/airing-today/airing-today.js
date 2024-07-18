"use client";
import {getAiringTodayTv} from "@/app/tv/actions";
import ContentClientSide from "@/app/_components/content-client-side";

export default function AiringToday() {
  return <ContentClientSide queryFn={getAiringTodayTv} queryKey={["airing-today-tv"]} />
}