import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url, options) => {
  return fetch(process.env.NEXT_PUBLIC_API + url, options).then((res) => res.json());
}

export const convertToUSD = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}