'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LineMdRotate270, LucidePlus } from "./icones"
import { useRouter } from "next/navigation"


export type itemsNavProps = {
    href: string,
    name: string,
    icons: any,
    btn?: boolean
}

export default function ItemsNav({ href = '/', name, icons, btn }: itemsNavProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [state, setState] = useState(false)

    useEffect(() => {
        if (pathname === href) {
            setState(true)
        } else {
            setState(false)
        }
    }, [pathname])

    return (
        <div className={`flex items-center mb-3 ${state ? 'bg-vert transition-all ease-in-out duration-300 text-black font-semibold' : 'hover:bg-vert-transparent transition-all ease-in-out duration-300 text-white font-medium'}`}>
            <Link href={href} className="flex-1">
                <div className={`h-[52px] w-full  flex items-center pl-9 gap-4  flex-1`}>
                    <div>
                        {icons}
                    </div>
                    {name}
                </div>
            </Link>
            {
                btn
                    ? (
                        <div>
                            {
                                state
                                    ? (<button onClick={() => router.refresh()} className={`h-[52px] aspect-square flex items-center justify-center`}>
                                        <LineMdRotate270 className="w-6 h-6" />
                                    </button>)
                                    : (
                                        <Link href={'/videos/new'} >
                                            <div className={`h-[52px] aspect-square flex items-center justify-center bg-vert-transparent`}>
                                                <LucidePlus className="h-6 w-6" />
                                            </div>
                                        </Link>
                                    )
                            }
                        </div>
                    )
                    : null
            }
        </div>
    )
}