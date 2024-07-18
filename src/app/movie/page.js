import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import Popular from "@/app/movie/popular";
import {getPopularMovie} from "@/app/movie/actions";

export default async function Movie() {
  return (
    <SortAndFilterServer title={"Popular Movie"} category={"movie"}>
      <ContentServerSide queryFn={getPopularMovie} queryKey={["popular-movie"]}>
        <Popular />
      </ContentServerSide>
    </SortAndFilterServer>
  );
}
