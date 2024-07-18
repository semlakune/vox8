"use client"
import Image from "next/image";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

export default function WatchProvider({ provider }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className={"grow relative p-1 py-2"} onClick={() => setChecked(!checked)}>
      {/*<input type="checkbox" id={provider.provider_id} name={provider.provider_id} />*/}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Image src={provider.logo} alt={provider.provider_name} width={60} height={60} className={cn(`rounded-xl transition-all duration-200 neumorphism ${checked && "border border-background scale-110"}`)}/>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            {provider.provider_name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {checked && <CheckCircledIcon className={"absolute top-0 right-3 w-6 h-6 text-white font-bold rounded-full bg-background"}/>}
    </div>
  )
}