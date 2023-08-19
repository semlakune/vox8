import {Input} from "@/components/ui/input";
import {ModeToggle} from "@/components/ModeToggle";
import {useMediaQuery} from "react-responsive";
import {useRouter} from "next/navigation";

const SearchAndToggleSection = ({search, setSearch}) => {
  const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if (isMobile) return null
    return (
        <div className="flex justify-between items-center gap-3">
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${search.replace(/\s+/g, "+").toLowerCase()}`)
            }}>
                <Input placeholder={"Search"} onChange={(e) => setSearch(e.target.value)} />
            </form>
            <ModeToggle />
        </div>
    )
}

export default SearchAndToggleSection;