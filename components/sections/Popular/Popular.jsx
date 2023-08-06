import Scroller from "@/components/Scroller";

const PopularSection = ({ data, loading }) => {
  if (loading) return <div>Loading...</div>;
  return (
      <div>
        <Scroller data={data?.popularData} />
      </div>
  )
}

export default PopularSection