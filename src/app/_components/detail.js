"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { convertToUSD, fetcher } from "@/lib/utils";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect } from "react";
import DetailHero from "@/app/_components/detail-hero";
import Card from "@/components/Card";

export default function Detail({ queryKey, category }) {
  const params = useParams();
  const { data } = useQuery({
    queryKey: [queryKey, params.id],
    queryFn: async () =>
      await fetcher(
        `/${category}/${params.id}?append_to_response=keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos`,
      ),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (data?.message) {
    return <NotFound />;
  }

  console.log(data, "<< detail ");

  return (
    <div className={"flex flex-col gap-5"}>
      {/* HERO */}
      <DetailHero data={data} category={category} />

      {/* BODY */}
      <div
        className={
          "w-full h-full max-w-[1400px] mx-auto px-[40px] pb-20 flex flex-col"
        }
      >
        <div className={"flex items-center gap-2 w-full pb-5"}>
          <h1
            className={
              "leading-none drop-shadow w-fit whitespace-nowrap border py-2 px-3 rounded-full"
            }
          >
            Top Billed Cast
          </h1>
          <Separator className={"opacity-20"} />
        </div>

        {/*CAST*/}
        <ScrollArea className="w-full whitespace-nowrap" type={"always"}>
          <div className="flex w-max space-x-5 py-2 pl-1">
            {data["credits"]["cast"].slice(0, 12).map((cast, i) => (
              <div
                onClick={() => console.log(cast)}
                key={i}
                className={
                  "w-44 h-[264px] flex flex-col items-center gap-2 pb-4 relative"
                }
              >
                <div
                  className={
                    "absolute bottom-4 rounded-b-2xl h-1/3 w-full p-3 pt-10 grid grid-rows-2 gap-0 items-end"
                  }
                  style={{
                    background: `linear-gradient(to top, rgb(${data["poster_color"]}), 70%,rgba(${data["poster_color"]},0))`,
                    color: data["posterFontColor"],
                  }}
                >
                  <h1 className={"text-xl w-full truncate"}>{cast.name}</h1>
                  <p className={"italic w-full truncate"}>
                    {cast["character"]}
                  </p>
                </div>
                <Image
                  src={
                    cast["profile_path"]
                      ? "https://image.tmdb.org/t/p/original" +
                        cast["profile_path"]
                      : "/user-grey.svg"
                  }
                  alt={cast.name}
                  width={500}
                  height={500}
                  className={"w-full h-full rounded-2xl object-top neumorphism"}
                  blurDataURL={data["poster_blurHash"]}
                />
              </div>
            ))}

            <div
              className={
                "flex items-center justify-center w-44 h-[264px] text-white"
              }
            >
              <Link
                href={`/${category}/${params.id}/cast`}
                className={
                  "flex gap-2 items-center hover:scale-110 transition-all duration-500"
                }
              >
                <h1>View More</h1>
                <ArrowRightIcon className={"w-4 h-4"} />
              </Link>
            </div>
          </div>
          <ScrollBar
            orientation="horizontal"
            className={
              "opacity-20 hover:opacity-80 hover:h-[12px] transition-all duration-500"
            }
          />
        </ScrollArea>

        <div className={"grid grid-cols-[3fr_1fr] gap-2 my-5"}>
          <div className={"debug"}></div>

          <aside className={"flex flex-col gap-5"}>
            <div>
              <h1 className={"font-bold"}>Status</h1>
              <p>{data.status}</p>
            </div>
            <div>
              <h1 className={"font-bold"}>Original Language</h1>
              <p>
                {data["spoken_languages"].find(
                  (lang) => lang["iso_639_1"] !== "xx",
                )
                  ? data["spoken_languages"].find(
                      (lang) => lang["iso_639_1"] === data["original_language"],
                    )["english_name"]
                  : "-"}
              </p>
            </div>
            <div>
              <h1 className={"font-bold"}>Budget</h1>
              <p>{data["budget"] > 0 ? convertToUSD(data["budget"]) : "-"}</p>
            </div>
            <div>
              <h1 className={"font-bold"}>Revenue</h1>
              <p>{data["revenue"] > 0 ? convertToUSD(data["revenue"]) : "-"}</p>
            </div>
            <div>
              <h1 className={"font-bold"}>Keywords</h1>
              <div className={"flex flex-wrap gap-2 mt-2"}>
                {data["keywords"] && data["keywords"]["keywords"].length > 0
                  ? data["keywords"]["keywords"].map((keyword) => {
                      return (
                        <span key={keyword.id}>
                          <p
                            className={
                              "leading-none drop-shadow w-fit whitespace-nowrap border py-1 px-3 rounded-full capitalize text-sm"
                            }
                          >
                            {keyword.name}
                          </p>
                        </span>
                      );
                    })
                  : "-"}
              </div>
            </div>
          </aside>
        </div>

        <div className={""}>
          <div className={"flex items-center gap-2 w-full"}>
            <h1
              className={
                "leading-none drop-shadow w-fit whitespace-nowrap border py-2 px-3 rounded-full"
              }
            >
              Similar
            </h1>
            <Separator className={"opacity-20"} />
          </div>

          {/*SIMILAR*/}
          <ScrollArea className="w-full whitespace-nowrap pb-4 pr-1">
            <div className="flex w-max space-x-5 py-2 pl-1">
              {data === undefined
                ? [...Array(10)].map((_, i) => <Card key={i} data={"loading"}/>)
                : data["similar"]?.map((item, i) => <Card key={i} data={item}/>)}
            </div>
            <ScrollBar orientation="horizontal" className={"opacity-80"} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
