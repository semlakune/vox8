import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useSearch(query, page) {
  if (!page) page = 1
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/search?query=${query}&page=${page}`, fetcher);

  return {
    dataSearch: data,
    isLoadingSearch: isLoading,
    isErrorSearch: error,
  }
}

export default useSearch;