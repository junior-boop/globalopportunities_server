'use client'
import { useEffect, useRef, useState } from "react";
import { LineMdPauseToPlayFilledTransition, LineMdPlayFilledToPauseTransition } from "./icones";

export default function VideoPlayers({ source }: { source: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsplaying] = useState(false)



    useEffect(() => {
        (async () => {
            if (videoRef.current !== null) {
                const player = videoRef.current as HTMLVideoElement
                if (isPlaying) player.play()
                else player.pause()
            }
        })()

    }, [isPlaying, videoRef])
    return (
        <div className="mb-6 border w-[950px] border-slate-800 relative justify-center items-center">
            <div className="absolute z-[5] w-full h-[87%] flex items-center justify-center transition-opacity duration-300 ease-in opacity-0 hover:opacity-100"  >
                <button className="flex w-14 aspect-square bg-[#0006] items-center justify-center border border-vert outline-none translate-y-10" onClick={() => setIsplaying(!isPlaying)} >
                    {
                        isPlaying
                            ? <LineMdPlayFilledToPauseTransition className="w-9 h-9 text-vert" />
                            : <LineMdPauseToPlayFilledTransition className="w-9 h-9 text-vert" />
                    }
                </button>
            </div>
            <video ref={videoRef} width={'950px'} className="aspect-video" controls>
                <source src={source} />
            </video>
        </div>
    )
}