import useSWR from "swr";
import fetcher from "@/api/fetchers";

function useSimilar(group, id) {
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_VOX8_API + `/detail/${group}/${id}/similar`, fetcher);

    return {
        dataSimilar: data,
        isLoadingSimilar: isLoading,
        isErrorSimilar: error,
    }
}

export default useSimilar;