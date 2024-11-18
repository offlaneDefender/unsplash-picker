"use client"
import usePicsStore from "@/store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { createApi } from "unsplash-js";

const MY_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCES_KEY ?? "";

const unsplash = createApi({
  accessKey: MY_ACCESS_KEY,
});

export default function Home() {
  const { name, setName, surname, setSurname, preferences, selectedPreference, setSelectedPreference, otherPreference, setOtherPreference, picRes, setpicRes, selectedImageIndex, setSelectedImageIndex, tempIndex, setTempIndex } = usePicsStore();

  const router = useRouter();

  const fetchImages = async () => {
    setSelectedImageIndex(-1);
    setpicRes([]);
    setTempIndex(0);

    const finalPref = selectedPreference === "Other" ? otherPreference : selectedPreference;
    const response = await unsplash.search.getPhotos({
      query: finalPref,
      perPage: 10,
    }).then(res => res.response)
      .catch(err => console.log(err));

    setpicRes((response?.results as []) ?? []);

    router.push('/approval');
  }

  const imageApprovalView = (index: number) => {
    if (index > picRes.length - 1) {
      return <div> No more images to show </div>
    }
    const pic = picRes[index] as any;
    return (
      <div className="grid grid-cols-3">
        <div className="flex gap-3">
          <button onClick={() => setSelectedImageIndex(index)}>Approve</button>
          <button onClick={() => setTempIndex(tempIndex + 1)}>Reject</button>
        </div>
        <img key={pic.id} src={pic.urls.regular} alt={pic.alt_description} />
      </div>
    )
  }

  const submitDisabled = useMemo(() => {
    return selectedPreference === "" || (selectedPreference === "Other" &&
      otherPreference === "" || name === "" || surname === ""
    )
  }
    , [selectedPreference, otherPreference, name, surname])

  /**
   * refactor asa server componetns
   * accepted image is added to list, one card per image
   * refetch images if no more images
   */

  return (
    <div className="bg-slate-400 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <input autoFocus className="text-black p-1" type="text" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="text-black p-1" type="text" placeholder="Surname*" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <select className="text-black p-1" value={selectedPreference} onChange={(e) => setSelectedPreference(e.target.value)}>
            <option value="" disabled>Select Preference*</option>
            {preferences.map((preference) => (
              <option key={preference} value={preference}>
                {preference}
              </option>
            ))}
          </select>
          {selectedPreference === "Other" && (
            <input className="text-black p-1" type="text" placeholder="Other Preference" value={otherPreference} onChange={(e) => setOtherPreference(e.target.value)} />
          )}
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button disabled={submitDisabled} className="p-2 bg-white text-black cursor-auto disabled:opacity-50 disabled:border-red-500 disabled:border-2" onClick={fetchImages}>
            Submit
          </button>
          {submitDisabled && <p className="text-red-500">Please fill in all fields</p>}
        </div>
        {selectedImageIndex !== -1 && picRes.length > 0 &&
          <div className="flex flex-col gap-4 rounded shadow bg-slate-200 p-2">
            <p className="text-black">{name} {surname}</p>
            <img key={(picRes[selectedImageIndex] as any).id} src={(picRes[selectedImageIndex] as any).urls.thumb} alt={(picRes[selectedImageIndex] as any).alt_description} />
          </div>}
      </main>
      <footer className="row-start-3 </div>flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}


