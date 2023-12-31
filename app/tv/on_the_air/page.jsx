'use client';
import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import {useState} from "react";
import useOnTheAir from "@/api/useOnTheAir";

export default function OnTheAir() {
  const [page, setPage] = useState(1);
  const { dataOnTheAir, isLoadingOnTheAir, isErrorOnTheAir } = useOnTheAir(page);
  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <ContentLists type={"on-the-air"} group={"tv"} data={dataOnTheAir} loading={isLoadingOnTheAir} error={isErrorOnTheAir} setPage={setPage} />
        </div>
      </>
  );
}
