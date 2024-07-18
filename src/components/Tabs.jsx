import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";

export default function TabsComponent({ title, tabData, tabActive, setTabActive }) {
  const handleChangeTab = (tab) => {
    setTabActive(tab);
  }

  return (
    <div className={"flex items-center justify-between gap-2 mb-2 w-full"}>
      <h1 className={"font-bold drop-shadow w-fit whitespace-nowrap"}>{title}</h1>
      <Tabs defaultValue={tabActive}>
        <TabsList className={"bg-black text-white neumorphism"}>
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => handleChangeTab(tab.value)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Separator className={"opacity-20"} />
    </div>
  );
}
