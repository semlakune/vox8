import {Navbar} from "@/components/sections/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <div>
        <Navbar />
        <div className={"container mt-5 px-6 max-w-7xl"}>
            <Hero />
        </div>
    </div>
  )
}
