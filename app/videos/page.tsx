import { HeaderPage } from "@/components/header";
import VideoItem from "@/components/videoItem";

export interface response {
    videoId: string,
    image: string,
    title: string,
    descript: string,
    size: number,
    duration: number
}

const getData = async (): Promise<response[]> => {
    const request = await fetch(process.env.URL + '/metting', { cache: 'no-cache' })
    const data = await request.json()
    return data as response[]
}

export default async function Videos() {
    const data = await getData()
    return (
        <main className="relative">
            <HeaderPage name="Videos" hasBtn url="/videos/new" />
            <div className="pl-9 pt-9">
                {
                    data.map(el => <VideoItem href={`/videos/${el.videoId}`} key={el.videoId} data={el} />)
                }
            </div>
            <div className="h-20"></div>
        </main>
    );
}
