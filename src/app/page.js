import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {fetchWhatsPopular} from "@/app/actions";
import WhatsPopular from "@/app/_components/whats-popular";
import FreeToWatchServer from "@/app/_components/free-to-watch-server";
import Hero from "@/app/_components/hero";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["whats-popular", "streaming"],
    queryFn: async () => await fetchWhatsPopular({ category: "streaming" }),
  });

  return (
    <div className={"flex flex-col gap-10 px-5"}>
      <Hero />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WhatsPopular />
        <FreeToWatchServer />
      </HydrationBoundary>
    </div>
  );
}
