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
  const { name, setName, surname, setSurname, preferences, selectedPreference, setSelectedPreference, otherPreference, setOtherPreference, picRes, setpicRes, selectedImages, setTempIndex } = usePicsStore();

  const router = useRouter();

  const fetchImages = async () => {
    setpicRes([]);
    setTempIndex(0);

    const finalPref = selectedPreference === "Other" ? otherPreference : selectedPreference;
    const response = await unsplash.search.getPhotos({
      query: finalPref,
      perPage: 30,
    }).then(res => res.response)
      .catch(err => console.log(err));

    setpicRes((response?.results as []) ?? []);

    router.push('/approval');
  }

  const submitDisabled = useMemo(() => {
    return selectedPreference === "" || (selectedPreference === "Other" &&
      otherPreference === "" || name === "" || surname === ""
    )
  }
    , [selectedPreference, otherPreference, name, surname]);

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
        <div className="grid grid-cols-3 bg-slate-400 gap-4">
          {picRes.length > 0 &&
            selectedImages.length > 0 &&
            selectedImages.map((image) => (
              <div key={image.pic.id} className="flex flex-col gap-4 rounded shadow bg-slate-200 p-2">
                <p className="text-black">{image.name} {image.surname}</p>
                <img src={image.pic.urls.thumb} alt={image.pic.alt_description} />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}


