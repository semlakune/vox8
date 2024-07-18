"use client";
import {useQuery} from "@tanstack/react-query";
import {fetchWhatsPopular} from "@/app/actions";
import {useState} from "react";
import TabsComponent from "@/components/Tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import Card from "@/components/Card";
export default function WhatsPopular() {
  const tabs = [
    { label: "Streaming", value: "streaming" },
    { label: "On TV", value: "on_tv" },
    { label: "For Rent", value: "for_rent" },
    { label: "In Theaters", value: "in_theaters" },
  ]

  const [category, setCategory] = useState("streaming");

  const { data } = useQuery({
    queryKey: ["whats-popular", category],
    queryFn: async () => await fetchWhatsPopular({ category }),
  })

  return (
    <div className={"flex flex-col gap-2"}>
      <TabsComponent
        title={"What's Popular"}
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