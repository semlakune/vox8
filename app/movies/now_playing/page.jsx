import { Navbar } from "@/components/Navbar/Navbar";

export default function NowPlaying() {
  return (
      <div>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
          <h1>now playing movie</h1>
        </div>
      </div>
  );
}
