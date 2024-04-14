'use client'

import { HeaderPage } from "@/components/header";
import { LineMdConfirmCircle, LucideSave, SvgSpinners8DotsRotate } from "@/components/icones";
import { InputImage_2 } from "@/components/inputImage";
import { InputText_2 } from "@/components/inputText";
import { TextArea_2 } from "@/components/textArea";
import { InputVideo_2 } from "@/components/videoUploader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Videos() {
    const [duration, setDuration] = useState(0)
    const [loading, setLoading] = useState(0)
    const [complet, setComplet] = useState(false)
    const [upload, setUpload] = useState(false)
    const [disabled, setDisable] = useState(false)
    const router = useRouter()


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const target = e.target
        const image = target.image.files[0]
        const video = target.video.files[0]

        const bodyContent = new FormData()

        bodyContent.append('title', target.title.value)
        bodyContent.append('speaker', target.speaker.value)
        bodyContent.append('descript', target.desc.value)
        bodyContent.append('image', image)
        bodyContent.append('video', video)
        bodyContent.append('duration', duration.toString())

        await axios.post('/api/videos', bodyContent, {
            onUploadProgress: ({ loaded, total }) => {
                setUpload(true)
                setDisable(true)
                setLoading((loaded / total) * 100)

                if (loaded === total) {
                    setComplet(true)
                    setTimeout(() => {
                        router.push('/videos')
                    }, 2000)
                }
            }
        })
    }

    useEffect(() => {
        console.log(loading)
    }, [loading])



    return (
        <main className="relative">
            <HeaderPage name="New video" />
            <div className="pl-9 pt-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex w-[950px] gap-6">
                        <InputImage_2 />
                        <div className="flex-1">
                            <InputVideo_2 duration={(value: number) => setDuration(value)} />
                            <TextArea_2 label="Video title" name="title" placeholder="Type your title here" />
                            <InputText_2 label="Speaker" name="speaker" placeholder="Speakers Name" />
                            <TextArea_2 label="Description" name="desc" placeholder="Type the description here" />
                            <button className="w-full h-[52px] bg-vert text-black font-bold mt-4 flex items-center justify-center gap-3" disabled={disabled}>
                                {
                                    !upload
                                        ? (<><LucideSave className="w-6 h-6" /> Save</>)
                                        : (
                                            <>
                                                {
                                                    !complet
                                                        ? (<div className="h-full relative w-full">
                                                            <div className="bg-black opacity-35 h-full" style={{ width: `${loading}%` }}></div>
                                                            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center px-4 gap-3">
                                                                <SvgSpinners8DotsRotate className="h-6 w-6" /> Wait! It's saving...
                                                            </div>
                                                        </div>)
                                                        : (
                                                            <div className="flex gap-3 items-center">
                                                                Operation completed
                                                                <LineMdConfirmCircle className="w-6 h-6" />
                                                            </div>
                                                        )
                                                }
                                            </>
                                        )
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="h-28"></div>
        </main>
    );
}