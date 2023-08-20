import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useOnTheAir(page) {
  if (!page) page = 1
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/on_the_air/?page=${page}&timezone=Asia/Jakarta&language=en-US`, fetcher);

  return {
    dataOnTheAir: data,
    isLoadingOnTheAir: isLoading,
    isErrorOnTheAir: error,
  }
}

export default useOnTheAir;