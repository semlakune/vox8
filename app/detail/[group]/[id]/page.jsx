'use client';
import useDetail from "@/api/useDetail";
import {Navbar} from "@/components/Navbar/Navbar";
import useSimilar from "@/api/useSimilar";
import Scroller from "@/components/Scroller";

const DetailPage = ({ params }) => {
  const { group, id } = params
  const { dataDetail, isErrorDetail, isLoadingDetail } = useDetail(group, id)
  const { dataSimilar, isErrorSimilar, isLoadingSimilar } = useSimilar(group, id)

  return (
      <>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>

          {/* SIMILAR SECTION */}
          <Scroller data={dataSimilar} loading={isLoadingSimilar} error={isErrorSimilar} title={"Similar"} group={group} />
        </div>
      </>
  )
}

export default DetailPage