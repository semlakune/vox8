import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {fetchFreeToWatch} from "@/app/actions";
import FreeToWatch from "./free-to-watch";
export default async function FreeToWatchServer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["free-to-watch", "movie"],
    queryFn: async () => await fetchFreeToWatch({ category: "movie" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FreeToWatch />
    </HydrationBoundary>
  );
}