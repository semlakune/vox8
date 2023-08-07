import Scroller from "@/components/Scroller";

const PopularSection = ({ data, loading }) => {

  return (
      <div>
        <Scroller data={data?.popularData} loading={loading} title={"Popular"} />
      </div>
  )
}

export default PopularSection