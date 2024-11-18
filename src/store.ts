import { create } from 'zustand'

interface SelectedImage{
    pic: any;
    name: string;
    surname: string;
}

interface PicsState {
    picRes: [];
    tempIndex: number;
    selectedImages: SelectedImage[];
    selectedPreference: string;
    otherPreference: string;
    name: string;
    surname: string;
    preferences: string[];
    setpicRes: (pics: []) => void;
    setTempIndex: (temporaryIndex: number) => void;
    setSelectedPreference: (selectedPreference: string) => void;
    setOtherPreference: (otherPreference: string) => void;
    setName: (name: string) => void;
    setSurname: (surname: string) => void;
    addImageToSelection: (image: any) => void;
}

const usePicsStore = create<PicsState>()((set) => ({
    picRes: [],
    tempIndex: 0,
    selectedPreference: "",
    otherPreference: "",
    name: "",
    surname: "",
    preferences: ["Travel", "Cars", "Wildlife", "Technology", "Other"],
    selectedImages: [],
    addImageToSelection: (image: SelectedImage) => set((state) => ({ selectedImages: [...state.selectedImages, image] })),
    setpicRes: (pics: []) => set({ picRes: pics }),
    setTempIndex: (temporaryIndex: number) => set({ tempIndex: temporaryIndex }),
    setSelectedPreference: (selectedPreference: string) => set({ selectedPreference }),
    setOtherPreference: (otherPreference: string) => set({ otherPreference }),
    setName: (name: string) => set({ name }),
    setSurname: (surname: string) => set({ surname }),
}))

export default usePicsStore
