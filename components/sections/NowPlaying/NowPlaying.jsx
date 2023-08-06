"use client";
import Scroller from "@/components/Scroller";

const NowPlayingSection = ({ data }) => {

  return (
    <div>
      <Scroller data={data?.nowPlayingData} />
    </div>
  );
};

export default NowPlayingSection;
