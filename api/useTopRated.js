import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useTopRated(group, page) {
  if (!page) page = 1
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/top_rated/${group}?page=${page}`, fetcher);

  return {
    dataTopRated: data,
    isLoadingTopRated: isLoading,
    isErrorTopRated: error,
  }
}

export default useTopRated;