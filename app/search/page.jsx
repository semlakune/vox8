'use client'
import {Navbar} from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import useSearch from "@/api/useSearch";
import NotFound from "@/components/NotFound";

export default function SearchPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  const [page, setPage] = useState(1)
  const { dataSearch, isLoadingSearch, isErrorSearch } = useSearch(search, page);

  return (
    <>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
        {search.length < 1 || dataSearch?.message === "Not Found" ? (
            <NotFound />
        ) : (
            <ContentLists type={"search"} data={dataSearch} loading={isLoadingSearch} error={isErrorSearch} setPage={setPage} />

        )}
      </div>
    </>
  );
}