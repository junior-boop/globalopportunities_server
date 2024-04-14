import { LucideAreaChart, LucideFilm, LucideUsers } from "./icones";
import ItemsNav from "./navItems";

export default function Nav() {
    return (
        <nav className="max-w-[400px] w-full bg-noir-60 h-full pt-3">
            <ItemsNav href="/" name="Stats" icons={<LucideAreaChart className="w-6 h-6" />} />
            <ItemsNav href="/users" name="Users" icons={<LucideUsers className="w-6 h-6" />} />
            <ItemsNav href="/videos" name="Videos" icons={<LucideFilm className='w-6 h-6' />} btn />
        </nav>
    )
}


