'use client'
import { useEffect, useState } from "react";
import { LucideTrash2, SvgSpinners8DotsRotate } from "./icones";
import Link from "next/link";
// import { response } from "@/app/videos/page";
import { useRouter } from "next/navigation";
import { FileConvertSize, secondsToMinutes } from "@/utils/fonctions";
import { response } from "@/app/videos/type";

type VideoItemProps = {
    href: string,
    data: response
}

export default function VideoItem({ href = '/', data }: VideoItemProps) {
    const router = useRouter()
    const title = data.title.length > 50 ? `${data.title.substring(0, 50)}...` : data.title
    const descript = data.descript.length > 176 ? `${data.descript.substring(0, 176)}...` : data.descript
    const [isLoading, setIsloading] = useState(false)

    const size = FileConvertSize(data.size)
    const duration = secondsToMinutes(data.duration)

    const handleclickdelete = async () => {
        setIsloading(true)
        const request = await fetch("/api/videos/" + data.videoId, {
            method: 'DELETE'
        })

        if (request.ok) {
            setIsloading(false)
            router.refresh()
        }
    }


    return (
        <div className="flex items-start max-w-[850px] w-full mb-6">
            <Link href={href}>
                <div className="flex items-start gap-6">
                    <div className="w-[200px] aspect-square bg-slate-800">
                        <img src={`http://127.0.0.1:8787/images/${data.image}`} alt={data.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-4xl font-semibold">{title}</h2>
                        <div className="mb-5 opacity-65"><span>{duration}</span> | <span>{size}</span></div>
                        <p className="font-extralight">{descript}</p>
                    </div>
                </div>
            </Link>
            <div>
                <button onClick={handleclickdelete} className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all ease-in-out duration-300 hover:bg-vert-transparent active:bg-vert active:text-black">
                    {
                        isLoading
                            ? <SvgSpinners8DotsRotate className="w-6 h-6" />
                            : <LucideTrash2 className="h-6 w-6" />
                    }
                </button>
            </div>
        </div>
    )
}


