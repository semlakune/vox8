import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useDetail(group, id) {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/detail/${group}/${id}`, fetcher);

  return {
    dataDetail: data,
    isLoadingDetail: isLoading,
    isErrorDetail: error,
  }
}

export default useDetail;