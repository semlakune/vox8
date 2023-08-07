import Scroller from "@/components/Scroller";

const PopularSection = ({ data, loading }) => {

  return (
      <div>
        <div className={"flex items-center gap-2 mt-10 mb-2 px-3 font-bold text-2xl cursor-pointer w-max"}>
          <h1>Popular</h1>
          <div>-&gt;</div>
        </div>
        <Scroller data={data?.popularData} loading={loading} />
      </div>
  )
}

export default PopularSection