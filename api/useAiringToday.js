import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useAiringToday(page) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/airing_today/?page=${page}&timezone=Asia/Jakarta&language=en-US`, fetcher);

  return {
    dataAiringToday: data,
    isLoadingAiringToday: isLoading,
    isErrorAiringToday: error,
  }
}

export default useAiringToday;