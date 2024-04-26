import { HeaderPage } from "@/components/header";
import VideoItem from "@/components/videoItem";



const getData = async () => {
    const request = await fetch(process.env.URL + '/metting', { cache: 'no-cache' })
    const data = await request.json()
    return data
}

export default async function Videos() {
    const data = await getData()
    return (
        <main className="relative">
            <HeaderPage name="Videos" hasBtn url="/videos/new" />
            <div className="pl-9 pt-9">
                {
                    data.map(el => <VideoItem href={`/videos/${el.videoId}`} key={el.videoId} data={el} url = {process.env.URL} />)
                }
            </div>
            <div className="h-20"></div>
        </main>
    );
}
