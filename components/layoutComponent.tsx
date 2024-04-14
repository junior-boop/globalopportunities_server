'use client'

import Header from "./header"
import Nav from "./Nav"

export default function Navigation({ children }: any) {
    return (
        <>
            <Header />
            <div className="grid-template-col ">
                <Nav />
                <div className="screen">
                    {children}
                </div>
            </div>
        </>
    )
}