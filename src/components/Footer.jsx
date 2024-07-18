import moment from "moment/moment";
import {Separator} from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className={"flex gap-2 items-center justify-center p-4 overflow-hidden shadow-[0_-2px_12px_#080e10]"}>
      <Separator className={"opacity-20"} />
      <div className={"text-xs leading-none flex items-center border py-2 px-3 hover:bg-primary hover:border-primary rounded-full"}>Vox8 <span className={"leading-[0px] mx-2"}>&#9883;</span> {moment().year()}</div>
      <Separator className={"opacity-20"} />
    </footer>
  )
}