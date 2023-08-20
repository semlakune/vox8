import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useUpcoming(page) {
  if (!page) page = 1
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/upcoming/?page=${page}&region=us`, fetcher);

  return {
    dataUpcoming: data,
    isLoadingUpcoming: isLoading,
    isErrorUpcoming: error,
  }
}

export default useUpcoming;