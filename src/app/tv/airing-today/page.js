import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import {getAiringTodayTv} from "@/app/tv/actions";
import AiringToday from "@/app/tv/airing-today/airing-today";

export default async function TvAiringToday() {
  return (
    <SortAndFilterServer title={"Airing Today"} category={"tv"}>
      <ContentServerSide queryFn={getAiringTodayTv} queryKey={["airing-today-tv"]}>
        <AiringToday />
      </ContentServerSide>
    </SortAndFilterServer>
  );
}