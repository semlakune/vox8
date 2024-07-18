import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import TopRated from "@/app/movie/top-rated/top-rated";
import {getTopRatedMovie} from "@/app/movie/actions";

export default async function TopRatedMovie() {
  return (
    <SortAndFilterServer title={"Top Rated Movie"} category={"movie"}>
      <ContentServerSide queryFn={getTopRatedMovie} queryKey={["top-rated-movie"]}>
        <TopRated />
      </ContentServerSide>
    </SortAndFilterServer>
  )
}