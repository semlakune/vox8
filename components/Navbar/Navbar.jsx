"use client"
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Cross1Icon, CrossCircledIcon, HamburgerMenuIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";

const MenuSection = dynamic(() => import('./MenuSection'), { ssr: false });
const SearchToggleSection = dynamic(() => import('./SearchAndToggleSection'), { ssr: false });

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState("");
    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth <= 768);
            window.addEventListener("resize", () => {
                setIsMobile(window.innerWidth <= 768);
            });
        }
    }, []);

    return (
        <div
            className="sticky top-0 z-50 border-b bg-white dark:bg-black dark:border-gray-700"
        >
            <div className="container mx-auto max-w-7xl px-6 py-2 flex justify-between items-center">
                {isMobile ? (
                    <>
                        {isMenuMobileOpen ? (
                            <Cross1Icon className={"w-6 h-6"} onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)} />
                        ) : (
                            <HamburgerMenuIcon className={"w-6 h-6"} onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)} />
                        )}
                    </>
                ) : null}
                <div className={"flex justify-between items-center gap-8"}>
                    <Link href="/">
                        <Image src={"/vox8.svg"} alt={"vox8"} width={36} height={36} priority />
                    </Link>
                    <MenuSection isMobile={isMobile} />
                </div>
                <SearchToggleSection search={search} setSearch={setSearch} isMobile={isMobile} />
                {isMobile ? (
                    <>
                        {isSearchMobileOpen ? (
                            <CrossCircledIcon className={"w-6 h-6"} onClick={() => setIsSearchMobileOpen(!isSearchMobileOpen)} />
                        ) : (
                            <MagnifyingGlassIcon className={"w-6 h-6"} onClick={() => setIsSearchMobileOpen(!isSearchMobileOpen)} />
                        )}
                    </>
                ) : null}
            </div>
        </div>
    )
}