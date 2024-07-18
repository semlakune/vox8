"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WatchProvider from "./watch-provider";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getGenres, getWatchProviders } from "@/app/movie/actions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function SortAndFilterClient({ category }) {
  const sortOptions = [
    {
      label: "Popularity Descending",
      value: "popularity.desc",
    },
    {
      label: "Popularity Ascending",
      value: "popularity.asc",
    },
    {
      label: "Rating Descending",
      value: "vote_average.desc",
    },
    {
      label: "Rating Ascending",
      value: "vote_average.asc",
    },
    {
      label: "Release Date Descending",
      value: "release_date.desc",
    },
    {
      label: "Release Date Ascending",
      value: "release_date.asc",
    },
    {
      label: "Title (A-Z)",
      value: "original_title.asc",
    },
    {
      label: "Title (Z-A)",
      value: "original_title.desc",
    },
  ];

  const { data } = useQuery({
    queryKey: ["watch-providers", "genres"],
    queryFn: async () => {
      const watchProviders = await getWatchProviders({ category });
      const genres = await getGenres({ category });
      return { watchProviders, genres };
    },
  });

  return (
    <div className={"w-1/5 sticky top-[5rem] z-30"}>
      <div className={"flex flex-col gap-2"}>
        <SortFilterItem label={"Sort"}>
          <p className={"mb-1 text-xs"}>Sort Results By</p>
          <Select defaultValue={"popularity.desc"}>
            <SelectTrigger className={"border border-gray-400 rounded-xl"}>
              <SelectValue placeholder="Sort Results By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SortFilterItem>
        <SortFilterItem label={"Where To Watch"}>
          <ScrollArea className={"w-full h-[40rem]"}>
            <div className={"flex flex-wrap gap-2"}>
              {data?.watchProviders.map((provider, index) => (
                <WatchProvider key={index} provider={provider} />
              ))}
            </div>
            <ScrollBar orientation="vertical" className={"opacity-80"} />
          </ScrollArea>
        </SortFilterItem>
        <SortFilterItem label={"Filters"}>
          <div className={"flex flex-col gap-2"}>
            <p className={"mb-1 text-xs"}>Releases Dates</p>
            <DatePickerWithRange />
            <Separator className={"opacity-20"} />
            <p className={"mb-1 text-xs"}>Genres</p>
            <div className={"flex flex-wrap gap-2"}>
              {data?.genres.map((genre, index) => (
                <Button key={index} className={"rounded-full bg-background"}>
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>
        </SortFilterItem>
        <Button className={"w-full rounded-full neumorphism"}>Apply</Button>
      </div>
    </div>
  );
}

function SortFilterItem({ label, children }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={label}
        className={
          "p-2 px-5 rounded-3xl border-none bg-primary mb-2 neumorphism z-30"
        }
      >
        <AccordionTrigger className={"py-1"}>{label}</AccordionTrigger>
        <AccordionContent className={"py-2"}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
