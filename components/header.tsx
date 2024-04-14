import Link from "next/link"
import { LucidePlus } from "./icones"

export default function Header() {
    return (
        <header className="h-[62px] bg-noir-80 px-9 flex items-center">
            <h2 className="text-2xl font-extralight ">DashBoard</h2>
        </header>
    )
}


type HeaderPage = {
    name: string,
    url?: string,
    hasBtn?: boolean
}
export function HeaderPage({ name, url = '/', hasBtn }: HeaderPage) {
    return (
        <div className="backdrop-blur-2xl flex items-center h-[125px] pl-8 gap-5 w-full sticky top-0 z-50">
            <div className="text-4xl font-extralight">
                {name}
            </div>
            {
                hasBtn && (<Link href={url}>
                    <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-vert text-black ">
                        <LucidePlus className="h-9 w-9" />
                    </div>
                </Link>)
            }
        </div>
    )
}