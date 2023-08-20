import Scroller from "@/components/Scroller";
import usePopular from "@/api/usePopular";
import {useState} from "react";

const PopularSection = () => {
  const [group, setGroup] = useState("movie");
  const { dataPopular, isLoadingPopular, isErrorPopular } = usePopular(group, 1);
  return (
      <div>
        <Scroller data={dataPopular} loading={isLoadingPopular} error={isErrorPopular} title={"Popular"} group={group} setGroup={setGroup} />
      </div>
  )
}

export default PopularSection