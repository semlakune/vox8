"use client";
import Scroller from "@/components/Scroller";

const NowPlayingSection = ({ data, loading }) => {

  return (
    <div>
      <Scroller data={data?.nowPlayingData} loading={loading} title={"Now Playing"} />
    </div>
  );
};

export default NowPlayingSection;
