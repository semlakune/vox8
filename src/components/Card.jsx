import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import StarIcon from "@/components/StarIcon";
import moment from "moment/moment";
import { Skeleton } from "@/components/ui/skeleton"
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Card({ data, className }) {

  if (data === "loading") {
    return (
      <div className={cn("w-52 h-[300px] rounded-3xl overflow-hidden relative", className)}>
        <Skeleton className={"w-full h-full bg-gray-500/40"} />
      </div>
    )
  }

  const url = data.first_air_date ? `/tv/${data.id}` : `/movie/${data.id}`

  return (
    <Link href={url} className={cn("w-52 h-[300px] rounded-3xl overflow-hidden relative neumorphism", className)}>
      <Image
        src={data.poster_path}
        alt={data.title ?? data.original_name ?? data.name}
        width={500}
        height={500}
        className={"object-cover object-top rounded-3xl w-full h-full"}
        placeholder="blur"
        blurDataURL={data.poster_blurHash}
      />
      <div
        className={
          "absolute bottom-0 w-full h-[30%] py-2 px-5 text-black flex flex-col justify-end"
        }
        style={{
          background: `linear-gradient(to top, rgb(${data.poster_color}), 80%,rgba(${data.poster_color},0))`,
          color: data.posterFontColor,
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className={"text-xl font-bold truncate text-left"}>
                {data.title ?? data.original_name}
              </p>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              {data.title ?? data.original_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className={"flex gap-2 items-center"}>
          <div className={"flex items-center space-x-1"}>
            <StarIcon className={"w-3 h-3 mb-0.5"} />
            <p className={"text-xs"}>{data.vote_average < 1 ? <span className={"border px-1"}>NR</span> : data.vote_average}</p>
          </div>
          <div
            className={`h-[80%] border-l`}
            style={{ borderColor: data.posterFontColor }}
          />
          <p className={"text-xs"}>
            {moment(data.release_date).format("DD MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
}