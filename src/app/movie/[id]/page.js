import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchMovieDetail} from "@/app/movie/actions";
import Detail from "@/app/_components/detail";

export default async function MovieDetail({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-detail", params.id],
    queryFn: async () => await fetchMovieDetail({ id: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail category={"movie"} queryKey={"movie-detail"} />
    </HydrationBoundary>
  )
}