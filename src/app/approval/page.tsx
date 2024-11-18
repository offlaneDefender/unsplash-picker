"use client"
import usePicsStore from "@/store";
import { useRouter } from "next/navigation";

export default function Approval() {
    const { picRes, setSelectedImageIndex, tempIndex, setTempIndex } = usePicsStore();
    const router = useRouter();
    if (tempIndex > picRes.length - 1) {
        return <div> No more images to show </div>
    }
    const pic = picRes[tempIndex] as any;
    return (
        <div className="grid bg-slate-400 items-center justify-center justify-items-center">
            <div className="flex gap-3">
                <button className="bg-green-200 text-black p-1 rounded shadow" onClick={() => {
                    setSelectedImageIndex(tempIndex);
                    router.push('/')
                }}>Approve</button>
                <button className="bg-red-200 text-black p-1 rounded shadow" onClick={() => setTempIndex(tempIndex + 1)}>Reject</button>
            </div>
            <img key={pic.id} src={pic.urls.regular} alt={pic.alt_description} />
        </div>
    )
}