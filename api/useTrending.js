import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useTrending(time) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/trending/all/${time}`, fetcher);

  return {
    dataTrending: data,
    isLoadingTrending: isLoading,
    isErrorTrending: error,
  }
}

export default useTrending;