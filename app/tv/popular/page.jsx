'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import usePopular from "@/api/usePopular";

export default function PopularTv() {
  const { dataPopular, isLoadingPopular, isErrorPopular } = usePopular("tv");
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"popular"} group={"tv"} data={dataPopular} loading={isLoadingPopular} error={isErrorPopular} />
        </div>
      </>
  );
}
