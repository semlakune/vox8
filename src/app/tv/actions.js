import {fetcher} from "@/lib/utils";

export async function getPopularTv({ pageParam = 1 }) {
  // return await fetcher("/discover/tv?watch_region=ID&sort_by=popularity.desc&page=" + pageParam)
return await fetcher("/tv/popular?watch_region=ID&page=" + pageParam)
}

export async function getTopRatedTv({ pageParam = 1 }) {
  return await fetcher("/discover/tv?watch_region=ID&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&page=" + pageParam)
}

export async function getOnTheAirTv({ pageParam = 1 }) {
  return await fetcher("/tv/on_the_air?watch_region=ID&page=" + pageParam)
}

export async function getAiringTodayTv({ pageParam = 1 }) {
  return await fetcher("/tv/airing_today?watch_region=ID&page=" + pageParam)
}

export async function fetchTvDetails({ id }) {
  return await fetcher(`/tv/${id}?append_to_response=credits`)
}