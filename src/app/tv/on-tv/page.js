import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import OnTv from "@/app/tv/on-tv/on-tv";
import {getOnTheAirTv} from "@/app/tv/actions";

export default async function TvOnTv() {
  return (
    <SortAndFilterServer title={"On TV"} category={"tv"}>
      <ContentServerSide queryFn={getOnTheAirTv} queryKey={["on-tv"]}>
        <OnTv />
      </ContentServerSide>
    </SortAndFilterServer>
  );
}