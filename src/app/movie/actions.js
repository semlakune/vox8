import {fetcher} from "@/lib/utils";
import moment from "moment/moment";

export async function getWatchProviders({ category = "movie" }) {
  const { results } = await fetcher(`/watch/providers/${category}?watch_region=ID`)
  return results
}

export async function getGenres({ category = "movie" }) {
  return await fetcher(`/genre/${category}/list`)
}

export async function getPopularMovie({ pageParam = 1 }) {
  // return await fetcher("/discover/movie?watch_region=ID&sort_by=popularity.desc&page=" + pageParam)
  return await fetcher("/movie/popular?watch_region=ID&page=" + pageParam)
}

export async function getNowPlayingMovie({ pageParam = 1 }) {
  return await fetcher("/movie/now_playing?watch_region=ID&page=" + pageParam)
}

export async function getTopRatedMovie({ pageParam = 1 }) {
  // return await fetcher("/movie/top_rated?watch_region=ID&page=" + pageParam)
  return await fetcher("/discover/movie?watch_region=ID&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&page=" + pageParam)
}

export async function getUpcomingMovie({ pageParam = 1 }) {
  return await fetcher(`/discover/movie?watch_region=ID&primary_release_date.gte=${moment().format("YYYY-MM-DD")}&page=` + pageParam)
}

export async function fetchMovieDetail({ id }) {
  return await fetcher(`/movie/${id}?append_to_response=keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos`)
}