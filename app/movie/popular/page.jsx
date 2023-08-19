'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import usePopular from "@/api/usePopular";
import {useState} from "react";

export default function PopularMovies() {
  const [page, setPage] = useState(1);
  const { dataPopular, isLoadingPopular, isErrorPopular } = usePopular("movie", page);
  return (
    <>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
        <ContentLists type={"popular"} group={"movie"} data={dataPopular} loading={isLoadingPopular} error={isErrorPopular} setPage={setPage} />
      </div>
    </>
  );
}
