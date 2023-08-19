import { Navbar } from "@/components/Navbar/Navbar";
import ContentLists from "@/components/ContentLists";

export default function PopularMovies() {
  return (
    <div>
      <Navbar />
      <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
        <ContentLists />
      </div>
    </div>
  );
}
