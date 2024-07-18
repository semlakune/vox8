"use client";
import {Button} from "@/components/ui/button";
import {MagnifyingGlassIcon, TokensIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {useRef, useState} from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Image from "next/image";

export default function Navbar() {
  const tooltipRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className={"fixed flex h-16 px-5 w-dvw z-50 noise drop-shadow-md"}>
      <div className={"relative h-full w-full"}>
        <Link className={"flex items-center gap-2 absolute left-0 -translate-y-1/2 top-1/2"} href={"/"}>
          <Image src={"/vox8.svg"} alt={"vox8"} width={100} height={100} className={"cursor-pointer w-10 h-10"}/>
          <h1 className={"text-2xl font-bold"}>Vox8</h1>
        </Link>
        <div className={"absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2"}>
          <div className={"p-1 bg-black rounded-full flex items-center justify-between space-x-2 neumorphism"}>
            {isSearchOpen ? (
              <input
                className={"bg-transparent text-white text-xs py-0 pl-3 h-[16px] outline-none"}
                type="text"
                placeholder={"Search for movies, series, etc."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus={true}
              />
            ) : (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className={`${isSearchHovered ? "text-gray-500" : "text-gray-50"}`}>Movie</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link href={"/movie"} className={"w-full"}>Popular</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/movie/now-playing"} className={"w-full"}>Now Playing</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/movie/upcoming"} className={"w-full"}>Upcoming</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/movie/top-rated"} className={"w-full"}>Top Rated</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className={`${isSearchHovered ? "text-gray-500" : "text-gray-50"}`}>TV/Series</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link href={"/tv"} className={"w-full"}>Popular</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/tv/airing-today"} className={"w-full"}>Airing Today</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/tv/on-tv"} className={"w-full"}>On TV</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={"/tv/top-rated"} className={"w-full"}>Top Rated</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}

            {!isSearchOpen ? (
              <Button
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                onClick={() => {
                  setIsSearchOpen(true)
                  tooltipRef.current.click()
                  setTimeout(() => {
                    tooltipRef.current.click()
                  }, 3000)
                }}
                className={`text-xs text-gray-50 font-medium h-auto rounded-full p-[4px] bg-background transition-all duration-500`}>
                <MagnifyingGlassIcon className={"w-4 h-4"}/>
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setIsSearchOpen(false)}
                  className={`text-xs text-gray-50 font-medium h-auto rounded-full p-[4px] bg-background transition-all duration-500`}>
                  <TokensIcon className={"w-4 h-4"}/>
                </Button>
              </>
            )}
          </div>
          <Popover>
            <PopoverTrigger className={"absolute bottom-0"} ref={tooltipRef}>
            </PopoverTrigger>
            <PopoverContent className={"bg-black w-fit rounded-full py-2 px-3 text-xs text-white border-gray-500/50"} align={"start"}>
              <p>Press enter to search</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}