'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import {useState} from "react";
import useNowPlaying from "@/api/useNowPlaying";

export default function NowPlaying() {
  const [page, setPage] = useState(1);
  const { dataNowPlaying, isLoadingNowPlaying, isErrorNowPlaying } = useNowPlaying(page);
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"now-playing"} group={"movie"} data={dataNowPlaying} loading={isLoadingNowPlaying} error={isErrorNowPlaying} setPage={setPage} />
        </div>
      </>
  );
}
