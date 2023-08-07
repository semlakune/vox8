"use client";
import Scroller from "@/components/Scroller";

const NowPlayingSection = ({ data, loading }) => {

  return (
    <div>
      <div className={"flex items-center gap-2 mt-10 mb-2 px-3 font-bold text-2xl cursor-pointer w-max"}>
        <h1>Now Playing</h1>
        <div>-&gt;</div>
      </div>
      <Scroller data={data?.nowPlayingData} loading={loading} />
    </div>
  );
};

export default NowPlayingSection;
