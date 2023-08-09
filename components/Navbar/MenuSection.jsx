import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {useMediaQuery} from "react-responsive";

const MenuSection = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
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
                                    <Button variant={"ghost"} id={"now-playing"}><p>Now Playing</p></Button>
                                </li>
                                <li>
                                    <Button variant={"ghost"} id={"popular"}><p>Popular</p></Button>
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
                                    <Button variant={"ghost"} id={"now-playing"}><p>Now Playing</p></Button>
                                </li>
                                <li>
                                    <Button variant={"ghost"} id={"popular"}><p>Popular</p></Button>
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