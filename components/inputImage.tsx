'use client'
import { useEffect, useRef, useState } from "react";
import { LucideImage, LucideSave, SvgSpinners8DotsRotate } from "./icones";

type InputImageProps = {
    url?: string,
    value?: string,
    id?: string
}

export default function InputImage({ url, value, id }: InputImageProps) {
    const [isLoading, setIsloading] = useState(false)
    const [disabled, setDisable] = useState(false)
    const image = useRef()
    const inputRef = useRef()

    const handleInputImage = ({ target }: any) => {
        setDisable(false)
        const file = target.files[0]

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            if (image.current !== undefined) {
                const img = image.current as HTMLImageElement
                img.src = base64String as string
            }
        };
        reader.readAsDataURL(file);
    }

    const uploadChangement = async () => {
        setIsloading(true)

        const file = inputRef.current
        if (file !== undefined) {

            if (!disabled) {
                const bodyContent = new FormData()
                const f = file as HTMLInputElement
                if (f.files !== null) {
                    bodyContent.append('image', f.files[0])
                }

                const link = await fetch(`/api/images/${id}`, {
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

    useEffect(() => {
        if (value) {
            setDisable(true)
        }
    }, [])
    return (
        <div className="w-[400px]">

            <div className="w-full bg-slate-900 aspect-square relative input-image">
                <input ref={inputRef} type="file" name="image" id="" accept="image/*" onChange={handleInputImage} />
                <div className="image">
                    <img ref={image} src={value} alt="" />
                </div>
                <button onClick={uploadChangement} className={`savebtn  ${disabled ? 'text-noir-100 opacity-50' : 'text-vert opacity-100'}`} disabled={disabled}>
                    {
                        isLoading
                            ? <SvgSpinners8DotsRotate className="w-6 h-6" />
                            : <LucideSave className="w-6 h-6" />
                    }
                </button>
            </div>

        </div>
    )
}

export function InputImage_2({ url }: InputImageProps) {
    const [fileName, setFileName] = useState<string>('')
    const [open, setOpen] = useState(false)
    const image = useRef()

    const handleInputImage = ({ target }: any) => {
        setOpen(false)
        const file = target.files[0]

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            image.current.src = base64String

        };
        reader.readAsDataURL(file);
    }
    return (
        <div className="w-[400px]">

            <div className="w-full bg-slate-900 aspect-square relative input-image mb-4">
                <input type="file" name="image" id="" accept="image/*" onChange={handleInputImage} required />
                <div className="image">
                    <img ref={image} src="/images.png" alt="" />
                </div>
                {/* <button className="savebtn">
                    <LucideSave className="w-6 h-6 text-vert" />
                </button> */}
            </div>
            <div className="flex gap-4">
                <LucideImage className="w-6 h-6" />
                Miniature
            </div>
        </div>
    )
}