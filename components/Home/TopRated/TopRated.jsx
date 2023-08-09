import Scroller from "@/components/Scroller";
import {useState} from "react";
import useTopRated from "@/api/useTopRated";

export default function TopRated() {
  const [group, setGroup] = useState("movie");
  const { dataTopRated, isErrorTopRated, isLoadingTopRated } = useTopRated(group);
  return (
      <div>
        <Scroller data={dataTopRated} loading={isLoadingTopRated} error={isErrorTopRated} title={"Top Rated"} group={group} setGroup={setGroup} />
      </div>
  )
}