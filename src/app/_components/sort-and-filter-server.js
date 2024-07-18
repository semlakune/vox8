import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TitleSection from "@/app/_components/title-section";
import SortAndFilterClient from "@/app/_components/sort-and-filter-client";
// import AutoScroll from "@/app/_components/auto-scroll";
import {getGenres, getWatchProviders} from "@/app/movie/actions";

export default async function SortAndFilterServer({ title, category, children }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["watch-providers", "genres"],
    queryFn: async () => {
      const watchProviders = await getWatchProviders({ category });
      const genres = await getGenres({ category });
      return { watchProviders, genres };
    },
  });

  return (
    <div className={"flex flex-col px-5"}>
      <TitleSection title={title} />
      <div className={"flex items-start w-full"}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SortAndFilterClient category={category}/>
          {children}
        </HydrationBoundary>
      </div>
      {/*<AutoScroll />*/}
    </div>
  );
}