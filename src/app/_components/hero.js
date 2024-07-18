import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import moment from "moment/moment";
import Image from "next/image";
import { fetcher } from "@/lib/utils";
import StarIcon from "@/components/StarIcon";
import Link from "next/link";

export default async function Hero() {
  const data = await fetcher("/trending/all/day");

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 2,
      }}
    >
      <CarouselContent className="py-2 -ml-5">
        {data.results.map((item) => {
          const url = item.first_air_date ? `/tv/${item.id}` : `/movie/${item.id}`
          return (
            <CarouselItem key={item.id} className="basis-1/2 pl-6">
              <Link href={url}>
                <div className={"relative w-full h-80 overflow-hidden rounded-3xl neumorphism"}>
                  <div
                    className={
                      "absolute w-[60%] h-80 overflow-hidden rounded-l-3xl p-8 cursor-pointer flex flex-col justify-between break-words"
                    }
                    style={{
                      background: `linear-gradient(to right, rgb(${item.backdrop_color}), 70%,rgba(${item.backdrop_color},0))`,
                      color: item.fontColor,
                    }}
                  >
                    <div>
                      <h1
                        className={
                          "text-4xl w-2/3 font-bold line-clamp-5 leading-tight"
                        }
                      >
                        {item.title ?? item.name}
                      </h1>
                      {item.release_date && (
                        <p>{moment(item.release_date).format("YYYY")}</p>
                      )}
                      {item.first_air_date && (
                        <p>{moment(item.first_air_date).format("YYYY")}</p>
                      )}
                    </div>
                    <div className={"flex gap-2 items-center"}>
                      <StarIcon/>
                      <span className={"text-sm font-bold"}>{item.vote_average < 1 ?
                        <span className={"bg-black text-white px-1"}>NR</span> : item.vote_average}</span>
                    </div>
                  </div>

                  <Image
                    src={item.backdrop_path}
                    alt={item.title ?? item.name}
                    width={1024}
                    height={1024}
                    className={"object-cover object-top w-full h-full"}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={item.backdrop_blurHash}
                  />
                </div>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  );
}
