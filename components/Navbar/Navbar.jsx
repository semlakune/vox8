"use client"
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Cross1Icon, CrossCircledIcon, HamburgerMenuIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import styled from "styled-components";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const MenuSection = dynamic(() => import('./MenuSection'), { ssr: false });
const SearchToggleSection = dynamic(() => import('./SearchAndToggleSection'), { ssr: false });

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState("");
    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);

    const router = useRouter()

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
                        <MagnifyingGlassIcon className={"w-6 h-6"} onClick={() => setIsSearchMobileOpen(!isSearchMobileOpen)} />
                    </>
                ) : null}
            </div>

            {isSearchMobileOpen && (
                <ModalSearch onClick={() => {
                    setIsSearchMobileOpen(false)
                    setSearch("")
                }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
                        {search.length > 0 && <CrossCircledIcon className={"w-10 h-10 ml-0 mr-5"} onClick={() => setSearch("")} />}
                        <Button onClick={() => router.push(`/search?q=${search.replace(/\s+/g, "+").toLowerCase()}`)}>Search</Button>
                    </div>
                </ModalSearch>
            )}
        </div>
    )
}

const ModalSearch = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        width: 100%;
        max-width: 360px;
        background-color: #fff;
        padding: 8px 10px;
        border-radius: 8px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        
        input {
            width: 100%;
            border: none;
            outline: none;
            padding: 10px;
            border-radius: 5px;
        }
    }
`;