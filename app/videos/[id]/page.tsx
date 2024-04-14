import InputImage from "@/components/inputImage";
import InputText from "@/components/inputText";
import TextArea from "@/components/textArea";
import InputVideo from "@/components/videoUploader";


export interface dataProps {
    videoId: string,
    images: string,
    video: string,
    videoName: string,
    imageName: string,
    title: string,
    descript: string,
    speaker: string,
    size: number,
    duration: number,
    createdAt: number
}

const getData = async (id: string): Promise<dataProps> => {
    const request = await fetch(process.env.URL + '/metting/' + id, { cache: "no-cache" })
    const data = await request.json()

    return data as dataProps
}

export default async function Videos({ params }: any) {
    const { id } = params
    const data = await getData(id)
    return (
        <main className="pl-9 pt-9">
            <div className="flex w-[950px] gap-6">
                <InputImage value={`${process.env.URL}/images/${data.imageName}`} id={data.videoId} />
                <div className="flex-1">
                    <InputVideo data={JSON.parse(data.video)} duration={data.duration} id={id} />
                    <TextArea label="Video title" name="title" placeholder="Type here" value={data.title} mettingId={data.videoId} />
                    <InputText label="Speaker" name="speaker" placeholder="Speakers Name" mettingId={data.videoId} value={data.speaker} />
                    <TextArea label="Description" name="descript" placeholder="Type the description here" mettingId={data.videoId} value={data.descript} />
                </div>
            </div>
            <div className="h-20"></div>
        </main>
    );
}
