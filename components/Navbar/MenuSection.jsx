import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation';

const MenuSection = ({isMobile}) => {
    const router = useRouter();


    if (isMobile) return null
    return (
        <div className={"flex justify-between items-center gap-4"}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger aria-controls={"radix-:R4mqcq:-trigger-radix-:Rsmqcq:"} id={"radix-:R4mqcq:-trigger-radix-:Rsmqcq:"}>Movies</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col w-max gap-1 p-2">
                                <li>
                                    <Button onClick={() => router.push("/movie/now_playing")} variant={"ghost"} id={"now-playing"}><p>Now Playing</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/movie/upcoming")} variant={"ghost"} id={"upcoming"}><p>Upcoming</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/movie/popular")} variant={"ghost"} id={"popular"}><p>Popular</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/movie/top_rated")} variant={"ghost"} id={"top-rated"}><p>Top Rated</p></Button>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger aria-controls={"radix-:R4mqcq:-trigger-radix-:Rsmqcq:"} id={"radix-:R4mqcq:-trigger-radix-:Rsmqcq:"}>TV/Series</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col w-max gap-1 p-2">
                                <li>
                                    <Button onClick={() => router.push("/tv/airing_today")} variant={"ghost"} id={"airing-today"}><p>Airing Today</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/tv/on_the_air")} variant={"ghost"} id={"on-the-air"}><p>On the Air</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/tv/popular")} variant={"ghost"} id={"popular"}><p>Popular</p></Button>
                                </li>
                                <li>
                                    <Button onClick={() => router.push("/tv/top_rated")} variant={"ghost"} id={"top-rated"}><p>Top Rated</p></Button>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default MenuSection;