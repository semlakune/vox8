import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import StarIcon from "@/components/StarIcon";
import { BookmarkFilledIcon, PlayIcon } from "@radix-ui/react-icons";

export default function DetailHero({ data, category }) {
  const duration = moment.duration(data.runtime, "minutes");
  const hours = duration.hours();
  const minutes = duration.minutes();
  const runTime = `${hours}h ${minutes}m`;

  const nonFilteredCrews =
    data && data["credits"] ? data["credits"]["crew"] : undefined;

  const jobsFilter = ["Director", "Producer", "Screenplay", "Story", "Writer"];
  const combinedData = {};

  nonFilteredCrews.forEach((crew) => {
    if (jobsFilter.includes(crew["job"])) {
      const { id, name, job } = crew;
      if (!combinedData[id]) {
        combinedData[id] = { id, name, jobs: [job] };
      } else if (!combinedData[id].jobs.includes(job)) {
        combinedData[id].jobs.push(job);
      }
    }
  });

  let filteredCrews = Object.values(combinedData).sort(
    (a, b) =>
      b.jobs.includes("Director") - a.jobs.includes("Director") || a.id - b.id,
  );

  return (
    <div className={"relative w-full h-[510px] overflow-hidden"}>
      <Image
        src={data["backdrop_path"]}
        alt={data.id}
        width={1280}
        height={510}
        placeholder={"blur"}
        blurDataURL={data["backdrop_blurHash"]}
        className={"w-full h-[510px] object-right-top opacity-60 object-cover"}
      />
      <div
        className={"absolute top-0 left-0 w-full h-full"}
        style={{
          background: `rgba(${data["backdrop_color"]},0.8)`,
          color: data["fontColor"],
        }}
      >
        <div
          className={
            "h-full w-full max-w-[1400px] py-[30px] px-[40px] m-auto flex items-start gap-10"
          }
        >
          <Image
            src={data["poster_path"]}
            alt={data.id}
            width={300}
            height={450}
            placeholder={"blur"}
            blurDataURL={data["poster_blurHash"]}
            className={"w-auto h-full rounded-2xl neumorphism"}
          />
          <div className={"flex flex-col justify-center gap-5"}>
            <div>
              <h1 className={"text-4xl font-bold"}>
                {data.title ?? data["original_name"]}{" "}
                <span className={`font-light text-${data["fontColor"]}/50`}>
                  ({moment(data["release_date"]).year()})
                </span>
              </h1>
              <div className={"flex items-center gap-2"}>
                <p>{moment(data["release_date"]).format("MM/DD/YYYY")}</p>
                <div className={`dot-separator bg-${data["fontColor"]}`}></div>
                <p>{data.genres.map((genre) => genre.name).join(", ")}</p>
                {category === "movie" && (
                  <>
                    <div
                      className={`dot-separator bg-${data["fontColor"]}`}
                    ></div>
                    <p>{runTime}</p>
                  </>
                )}
              </div>
            </div>
            <div className={"flex items-center gap-3"}>
              <Button className={"rounded-full p-2 px-3 cursor-auto"}>
                <StarIcon className={"w-3 h-3 mr-2"} />
                <span>{data["vote_average"]}</span>
              </Button>
              <Button className={"rounded-full p-2 px-3"}>
                <BookmarkFilledIcon className={"w-3 h-3"} />
              </Button>
              <Button className={"rounded-full p-2 px-3"}>
                <PlayIcon className={"w-3 h-3 mr-2"} />
                <span>Play Trailer</span>
              </Button>
            </div>
            <div>
              <h1
                className={`italic drop-shadow-[0_0_10px_black] text-${data["fontColor"]}/40`}
              >
                {data["tagline"]}
              </h1>
            </div>
            <div>
              <h1 className={"font-bold"}>Overview</h1>
              <p>{data["overview"]}</p>
            </div>
            <ol
              className={
                "grid grid-cols-3 gap-5 list-none list-inside top-0 left-0 m-0 p-0"
              }
            >
              {filteredCrews.map((crew) => (
                <li key={crew.id}>
                  <h1 className={"font-bold"}>{crew.name}</h1>
                  <p>{crew.jobs.join(", ")}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
