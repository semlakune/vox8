import Popular from "@/app/tv/popular";
import ContentServerSide from "@/app/_components/content-server-side";
import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import {getPopularTv} from "@/app/tv/actions";

export default async function PopularTv() {
  return (
    <SortAndFilterServer title={"Popular TV"} category={"tv"}>
      <ContentServerSide queryFn={getPopularTv} queryKey={["popular-tv"]}>
        <Popular />
      </ContentServerSide>
    </SortAndFilterServer>
  )
}