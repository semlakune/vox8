"use client";
import Scroller from "@/components/Scroller";

const NowPlayingSection = ({ data, loading }) => {

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <Scroller data={data?.nowPlayingData} />
    </div>
  );
};

export default NowPlayingSection;
