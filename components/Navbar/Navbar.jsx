"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Cross1Icon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon, MoonIcon, SunIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import MenuMobile from "@/components/Navbar/MenuMobile";
import {useTheme} from "next-themes";
import * as React from "react";

const MenuSection = dynamic(() => import("./MenuSection"), { ssr: false });
const SearchToggleSection = dynamic(() => import("./SearchAndToggleSection"), {
  ssr: false,
});

export const Navbar = () => {
  const { setTheme, theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSearch = () => {
      if (search.length < 1) return;

      router.push(`/search?q=${search
              .replace(/\s+/g, "+")
              .toLowerCase()}`,
      );
      document.querySelector('.sr-only').click()
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 768);
      });
    }
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b bg-white dark:bg-black dark:border-gray-700">
      <div className="container mx-auto max-w-7xl px-6 py-2 flex justify-between items-center">
        <div className={"flex justify-between items-center gap-8"}>
          <Link href="/">
            <Image
              src={"/vox8.svg"}
              alt={"vox8"}
              width={36}
              height={36}
            />
          </Link>
          <MenuSection isMobile={isMobile} />
        </div>
        <SearchToggleSection
          search={search}
          setSearch={setSearch}
          isMobile={isMobile}
        />
        {isMobile ? (
          <>
            <Sheet>
              <SheetTrigger>
                <HamburgerMenuIcon className={"w-6 h-6"} />
              </SheetTrigger>
              <SheetContent
                className={"py-20 flex flex-col items-start justify-start"}
              >
                <div
                  className={"flex justify-center items-center relative w-full"}
                >
                  <input
                    type="text"
                    className={
                      "border rounded-md w-full border-slate-400 py-2 pl-3 pr-10 active:border-black"
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search.length > 0 ? (
                    <Cross1Icon
                      className={"absolute w-4 h-4 right-4 text-black dark:text-white"}
                      onClick={() => setSearch("")}
                    />
                  ) : (
                    <MagnifyingGlassIcon
                      className={"absolute w-6 h-6 right-2 text-black dark:text-white"}
                    />
                  )}
                </div>
                <Button
                  className={`w-full ${
                    search.length > 0
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>

                {/* MENU */}
                <MenuMobile />
                {/* TOGGLE DARK MODE */}
                <div className={"absolute bottom-6 right-6"}>
                  <Button variant="outline" size="icon" id={"mode-toggle"}>
                    {theme === "light" ? (
                        <SunIcon onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    ) : (
                        <MoonIcon onClick={() => setTheme("light")} className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : null}
      </div>
    </div>
  );
};
