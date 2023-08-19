'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import {useState} from "react";
import useUpcoming from "@/api/useUpcoming";

export default function UpcomingMovie() {
  const [page, setPage] = useState(1);
  const { dataUpcoming, isLoadingUpcoming, isErrorUpcoming } = useUpcoming(page);
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"upcoming"} group={"movie"} data={dataUpcoming} loading={isLoadingUpcoming} error={isErrorUpcoming} setPage={setPage} />
        </div>
      </>
  );
}
