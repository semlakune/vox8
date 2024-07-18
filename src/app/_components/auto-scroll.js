"use client";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import useStore from "@/lib/store";

export default function AutoScroll() {
  const {autoInfinite, setAutoInfinite} = useStore((state) => state)

  return (
    <div className={"sticky left-[20px] bottom-[20px] -rotate-90 origin-top-left z-10"}>
      <div className={"flex items-center gap-2 w-fit"}>
        <Switch id="infinite-mode" checked={autoInfinite} onCheckedChange={(value) => setAutoInfinite(value)}/>
        <Label htmlFor="infinite-mode" className={`uppercase font-bold shadow ${autoInfinite ? "text-white glow-text-green" : "text-gray-300"}`}>Infinite Scroll</Label>
      </div>
    </div>
  )
}