import Scroller from "@/components/Scroller";

const PopularSection = ({ data }) => {
  return (
      <div>
        <Scroller data={data?.popularData} />
      </div>
  )
}

export default PopularSection