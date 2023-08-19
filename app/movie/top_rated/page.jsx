'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import useTopRated from "@/api/useTopRated";

export default function TopRatedMovie() {
  const { dataTopRated, isErrorTopRated, isLoadingTopRated } = useTopRated("movie");
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"top-rated"} group={"movie"} data={dataTopRated} loading={isLoadingTopRated} error={isErrorTopRated} />
        </div>
      </>
  );
}
