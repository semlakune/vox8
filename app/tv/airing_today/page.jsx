'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import {useState} from "react";
import useAiringToday from "@/api/useAiringToday";

export default function AiringToday() {
  const [page, setPage] = useState(1);
  const { dataAiringToday, isLoadingAiringToday, isErrorAiringToday } = useAiringToday(page);
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"airing-today"} group={"tv"} data={dataAiringToday} loading={isLoadingAiringToday} error={isErrorAiringToday} setPage={setPage} />
        </div>
      </>
  );
}
