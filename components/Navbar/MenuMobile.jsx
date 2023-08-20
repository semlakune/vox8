import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";

export default function MenuMobile() {
  return (
      <div className={"w-full mt-10"}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Movies</AccordionTrigger>
            <AccordionContent>
              <div className={"ml-2"}>
                <ul className={"flex flex-col gap-5 my-2"}>
                  <li>
                    <Link href={"/movie/popular"}>Popular</Link>
                  </li>
                  <li>
                    <Link href={"/movie/top_rated"}>Top Rated</Link>
                  </li>
                  <li>
                    <Link href={"/movie/upcoming"}>Upcoming</Link>
                  </li>
                  <li>
                    <Link href={"/movie/now_playing"}>Now Playing</Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>TV/Series</AccordionTrigger>
            <AccordionContent>
              <div className={"ml-2"}>
                <ul className={"flex flex-col gap-5 my-2"}>
                  <li>
                    <Link href={"/tv/popular"}>Popular</Link>
                  </li>
                  <li>
                    <Link href={"/tv/top_rated"}>Top Rated</Link>
                  </li>
                  <li>
                    <Link href={"/tv/airing_today"}>Airing Today</Link>
                  </li>
                  <li>
                    <Link href={"/tv/on_the_air"}>On The Air</Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  )
}