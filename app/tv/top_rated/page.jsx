'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import useTopRated from "@/api/useTopRated";

export default function TopRatedTv() {
  const { dataTopRated, isErrorTopRated, isLoadingTopRated } = useTopRated("tv");
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"top-rated"} group={"tv"} data={dataTopRated} loading={isLoadingTopRated} error={isErrorTopRated} />
        </div>
      </>
  );
}
