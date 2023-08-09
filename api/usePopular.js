import useSWR from "swr";
import fetcher from "@/api/fetchers";

function usePopular(group, page) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/popular/${group}?page=${page}`, fetcher);

  return {
    dataPopular: data,
    isLoadingPopular: isLoading,
    isErrorPopular: error,
  }
}

export default usePopular;