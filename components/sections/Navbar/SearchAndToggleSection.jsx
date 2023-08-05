import {Input} from "@/components/ui/input";
import {ModeToggle} from "@/components/ModeToggle";
import {useMediaQuery} from "react-responsive";

const SearchAndToggleSection = ({search, setSearch}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if (isMobile) return null
    return (
        <div className="flex justify-between items-center gap-3">
            <div>
                <Input placeholder={"Search"} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <ModeToggle />
        </div>
    )
}

export default SearchAndToggleSection;