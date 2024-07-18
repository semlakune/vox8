import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import Detail from "@/app/_components/detail";
import {fetchTvDetails} from "@/app/tv/actions";

export default async function TvDetails({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tv-details", params.id],
    queryFn: async () => await fetchTvDetails({ id: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail category={"tv"} queryKey={"tv-details"} />
    </HydrationBoundary>
  )
}