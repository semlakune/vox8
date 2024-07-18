import {Separator} from "@/components/ui/separator";

export default function TitleSection({ title }) {
  return (
    <div className={"flex items-center gap-2 w-full pb-5"}>
      <Separator className={"opacity-20"}/>
      <h1
        className={
          "text-xs leading-none drop-shadow w-fit whitespace-nowrap border py-2 px-3 hover:bg-primary hover:border-primary rounded-full"
        }
      >
        {title}
      </h1>
      <Separator className={"opacity-20"}/>
    </div>
  )
}