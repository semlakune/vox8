import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useNowPlaying(page) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/now_playing/?page=${page}&region=us`, fetcher);

  return {
    dataNowPlaying: data,
    isLoadingNowPlaying: isLoading,
    isErrorNowPlaying: error,
  }
}

export default useNowPlaying;