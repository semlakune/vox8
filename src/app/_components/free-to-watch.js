"use client";
import {useQuery} from "@tanstack/react-query";
import {fetchFreeToWatch} from "@/app/actions";
import TabsComponent from "@/components/Tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import Card from "@/components/Card";
import {useState} from "react";

export default function FreeToWatch() {
  const tabs = [
    { label: "Movie", value: "movie" },
    { label: "TV", value: "tv" },
  ]

  const [category, setCategory] = useState("movie");

  const { data } = useQuery({
    queryKey: ["free-to-watch", category],
    queryFn: async () => await fetchFreeToWatch({ category }),
  })

  return (
    <div className={"flex flex-col gap-2"}>
      <TabsComponent
        title={"Free To Watch"}
        setTabActive={setCategory}
        tabActive={category}
        tabData={tabs}
      />
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-5 py-2 pl-1">
          {data === undefined
            ? [...Array(10)].map((_, i) => <Card key={i} data={"loading"}/>)
            : data.map((item, i) => <Card key={i} data={item}/>)}
        </div>
        <ScrollBar orientation="horizontal" className={"opacity-80"}/>
      </ScrollArea>
    </div>
  )
}