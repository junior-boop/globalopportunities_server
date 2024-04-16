'use client'
import { RefAttributes, useEffect, useRef, useState, forwardRef } from "react";
import { LucideClock, LucideFileDigit, LucideFileVideo, LucideSave, SvgSpinners3DotsFade, SvgSpinners8DotsRotate } from "./icones";
import { FileConvertSize, secondsToMinutes } from "@/app/utils/fonctions";

export interface inputMedia {
    size: number,
    minetype: string,
    lastmodified: number,
    originalname: string,
    name: string
}

interface InputVideo {
    data: inputMedia,
    duration: number,
    id: string
}

export default function InputVideo({ data, duration, id }: InputVideo) {
    const [fileName, setFileName] = useState<string>('')
    const [open, setOpen] = useState(true)
    const [time, setTime] = useState('')
    const [taille, setTaille] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [loader, setLoader] = useState(false)

    const [disabled, setDisable] = useState(false)
    const inputRef = useRef<HTMLInputElement>()

    const originalName = data.originalname.length > 50 ? `${data.originalname.substring(0, 49)}...` : data.originalname

    const handleInputVideo = ({ target }: any) => {
        setDisable(false)
        setOpen(false)
        const file = target.files[0]
        const size = FileConvertSize(file.size)

        setTaille(size as string)

        const videoElment = document.createElement('video')
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            videoElment.src = base64String as string

            setOpen(true)
            setLoader(true)
            const set_2 = setTimeout(() => {
                const minutes = secondsToMinutes(videoElment.duration)
                setTime(minutes)
                setLoader(false)
            }, 15000)
        };

        reader.readAsDataURL(file);


        const name: string = file.name
        if (name.length > 50) {
            setFileName(`${name.substring(0, 50)}...`)
        } else {
            setFileName(name)
        }
    }

    useEffect(() => {
        const minutes = secondsToMinutes(duration)
        const size = FileConvertSize(data.size)
        setTime(minutes)
        setTaille(size as string)
        if (data) {
            setDisable(true)
        }
    }, [])

    const uploadChangement = async () => {
        setIsloading(true)
        const file = inputRef.current
        if (file !== undefined) {
            if (!disabled) {
                const bodyContent = new FormData()
                const f = file as HTMLInputElement
                if (f.files !== null) bodyContent.append('video', f.files[0])

                const link = await fetch(`/api/videos/${id}`, {
                    method: 'PUT',
                    body: bodyContent
                })

                if (link.ok) {
                    setIsloading(false)
                    setDisable(true)
                }
            }

        }

    }



    return (
        <div className="uploadVideo transition-all ease-in duration-300" style={{ height: open ? (64 + 42) : 64, overflow: 'hidden' }}>
            <input ref={inputRef} type="file" name="video" accept="video/mp4" onChange={handleInputVideo} />
            <div className="inputvideoUi">
                <LucideFileVideo className="w-6 h-6" />
                <div>
                    {
                        fileName.length !== 0 ? fileName : originalName
                    }
                </div>
            </div>
            <div className="w-full h-[42px] bg-noir-80 flex items-center">
                {
                    !loader
                        ? (<>
                            <div className="flex gap-4 px-4 pb-4 flex-1">
                                <LucideClock className='w-6 h-6' />
                                <div>{time}</div>
                            </div>
                            <div className="flex gap-4 px-4 pb-4 flex-1">
                                <LucideFileDigit className='w-6 h-6' />
                                <div>{taille}</div>
                            </div>
                            <button onClick={uploadChangement} className={`h-full aspect-square pr-4 pb-4 ${disabled ? 'text-noir-100' : 'text-vert'}`} disabled={disabled}>
                                {
                                    isLoading
                                        ? <SvgSpinners8DotsRotate className="w-6 h-6" />
                                        : <LucideSave className="w-6 h-6" />
                                }

                            </button>
                        </>)
                        : (
                            <div className="px-4 flex items-center flex-1 pb-4 gap-4">
                                It{"'"}s computing <SvgSpinners3DotsFade className="w-6 h-6 " />
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export function InputVideo_2({ duration }: any) {
    const [fileName, setFileName] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [time, setTime] = useState('')
    const [taille, setTaille] = useState('')
    const [loader, setLoader] = useState(false)

    const handleInputVideo = ({ target }: any) => {
        setOpen(false)
        const file = target.files[0]
        const size = FileConvertSize(file.size)

        setTaille(size as string)

        const videoElment = document.createElement('video')
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            videoElment.src = base64String as string
            setOpen(true)
            setLoader(true)
            const set_2 = setTimeout(() => {
                const minutes = secondsToMinutes(videoElment.duration)
                setTime(minutes)
                duration(Math.floor(videoElment.duration))
                setLoader(false)
            }, 15000)
        };

        reader.readAsDataURL(file);


        const name: string = file.name
        if (name.length > 50) {
            setFileName(`${name.substring(0, 50)}...`)
        } else {
            setFileName(name)
        }
    }
    return (
        <div className="uploadVideo transition-all ease-in duration-300" style={{ height: open ? (64 + 42) : 64, overflow: 'hidden' }}>
            <input type="file" name="video" accept="video/mp4" onChange={handleInputVideo} required />
            <div className="inputvideoUi">
                <LucideFileVideo className="w-6 h-6" />
                <div>
                    {
                        fileName.length !== 0 ? fileName : 'Input Video'
                    }
                </div>
            </div>
            <div className="w-full h-[42px] bg-noir-80 flex items-center">
                {
                    !loader
                        ? (<>
                            <div className="flex gap-4 px-4 pb-4 flex-1">
                                <LucideClock className='w-6 h-6' />
                                <div>{time}</div>
                            </div>
                            <div className="flex gap-4 px-4 pb-4 flex-1">
                                <LucideFileDigit className='w-6 h-6' />
                                <div>{taille}</div>
                            </div>
                        </>)
                        : (
                            <div className="px-4 flex items-center flex-1 pb-4 gap-4">
                                It{"'"}s computing <SvgSpinners3DotsFade className="w-6 h-6 " />
                            </div>
                        )
                }
            </div>
        </div>
    )
}


