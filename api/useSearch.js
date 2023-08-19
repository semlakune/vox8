import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useSearch(query, page) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/search?query=${query}&page=${page}`, fetcher);

  return {
    dataSearch: data,
    isLoadingSearch: isLoading,
    isErrorSearch: error,
  }
}

export default useSearch;