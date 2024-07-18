import SortAndFilterServer from "@/app/_components/sort-and-filter-server";
import ContentServerSide from "@/app/_components/content-server-side";
import NowPlaying from "@/app/movie/now-playing/now-playing";
import {getNowPlayingMovie} from "@/app/movie/actions";

export default async function MovieNowPlaying() {
  return (
    <SortAndFilterServer title={"Now Playing"} category={"movie"}>
      <ContentServerSide queryFn={getNowPlayingMovie} queryKey={["now-playing-movie"]}>
        <NowPlaying />
      </ContentServerSide>
    </SortAndFilterServer>
  );
}
