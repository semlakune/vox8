import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import {getTopRatedTv} from "@/app/tv/actions";
import ContentServerSide from "@/app/_components/content-server-side";
import TopRated from "@/app/tv/top-rated/top-rated";

export default async function TvTopRated() {
  return (
    <SortAndFilterServer title={"Top Rated TV"} category={"tv"}>
      <ContentServerSide queryFn={getTopRatedTv} queryKey={["top-rated-tv"]}>
        <TopRated />
      </ContentServerSide>
    </SortAndFilterServer>
  );
}