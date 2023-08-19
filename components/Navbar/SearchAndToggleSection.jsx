import {Input} from "@/components/ui/input";
import {ModeToggle} from "@/components/ModeToggle";
import {useRouter} from "next/navigation";

const SearchAndToggleSection = ({search, setSearch, isMobile}) => {
  const router = useRouter();
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