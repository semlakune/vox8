import {fetcher} from "@/lib/utils";

export async function fetchWhatsPopular({ category = "streaming" }) {
  let url = "";

  switch (category) {
    case "in_theaters":
      url = "/movie/now_playing";
      break;
    case "on_tv":
      url = "/tv/popular";
      break;
    case "for_rent": //
      url = "/discover/movie?watch_region=ID&sort_by=popularity.desc&with_watch_monetization_types=rent";
      break;
    case "streaming":
      url = "/discover/movie?watch_region=ID&sort_by=popularity.desc&with_watch_monetization_types=flatrate";
      break;
  }

  const response = await fetcher(url)
  return response.results;
}

export async function fetchFreeToWatch({ category }) {
  const url = `/discover/${category}?watch_region=ID&sort_by=popularity.desc&with_watch_monetization_types=free`;
  const response = await fetcher(url)
  return response.results;
}