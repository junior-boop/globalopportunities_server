'use client'

import { useEffect, useRef, useState } from "react"
import { LucideSave, SvgSpinners8DotsRotate } from "./icones"


type InputTextProps = {
    name: string,
    label: string,
    placeholder: string,
    url?: string,
    mettingId?: string,
    value?: string
}
export default function InputText({ name, label, placeholder, url, mettingId, value = "" }: InputTextProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsloading] = useState(false)
    const [disabled, setDisable] = useState(false)


    const uploadChangement = async () => {
        setIsloading(true)

        const input = inputRef.current as HTMLInputElement
        if (input !== undefined) {

            if (!disabled) {
                const bodyContent = new FormData()
                bodyContent.append(name, input.value)

                const link = await fetch(`/api/${name}/${mettingId}`, {
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
        if (value) setDisable(true)
        if (inputRef.current !== null && inputRef.current !== undefined) {
            inputRef.current.value = value
        }

    }, [inputRef])

    return (
        <div className="p-4 bg-noir-80 mt-4">
            <div className="mb-3 flex items-center justify-between">
                <label className="block w-full">
                    {label}
                </label>
                <button onClick={uploadChangement} className={disabled ? 'text-noir-100' : 'text-vert'}>
                    {
                        isLoading
                            ? <SvgSpinners8DotsRotate className="w-6 h-6" />
                            : <LucideSave className="w-6 h-6" />
                    }
                </button>
            </div>
            <input ref={inputRef} type="text" className="block w-full bg-noir-80 outline-none" placeholder={placeholder} name={name} onChange={() => setDisable(false)} />
        </div>
    )
}
export function InputText_2({ name, label, placeholder, url }: InputTextProps) {
    return (
        <div className="p-4 bg-noir-80 mt-4">
            <div className="mb-3 flex items-center justify-between">
                <label className="block w-full">
                    {label}
                </label>
                {/* <button>
                    <LucideSave className="w-6 h-6 text-vert" />
                </button> */}
            </div>
            <input type="text" className="block w-full bg-noir-80 outline-none" placeholder={placeholder} name={name} required />
        </div>
    )
}