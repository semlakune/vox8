import {getUpcomingMovie} from "@/app/movie/actions";
import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import Upcoming from "@/app/movie/upcoming/upcoming";

export default async function UpcomingMovie() {
  return (
    <SortAndFilterServer title={"Upcoming Movie"} category={"movie"}>
      <ContentServerSide queryFn={getUpcomingMovie} queryKey={["upcoming-movie"]}>
        <Upcoming />
      </ContentServerSide>
    </SortAndFilterServer>
  )
}