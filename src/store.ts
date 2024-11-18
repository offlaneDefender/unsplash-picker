import {create} from 'zustand'

interface PicsState {
    picRes: [];
    tempIndex: number;
    selectedImageIndex: number;
    selectedPreference: string;
    otherPreference: string;
    name: string;
    surname: string;
    preferences: string[];
    setpicRes: (pics: []) => void;
    setTempIndex: (temporaryIndex: number) => void;
    setSelectedImageIndex: (selectedImageIndex: number) => void;
    setSelectedPreference: (selectedPreference: string) => void;
    setOtherPreference: (otherPreference: string) => void;
    setName: (name: string) => void;
    setSurname: (surname: string) => void;
}

const usePicsStore = create<PicsState>()((set) => ({
    picRes: [],
    tempIndex: 0,
    selectedImageIndex: -1,
    selectedPreference: "",
    otherPreference: "",
    name: "",
    surname: "",
    preferences: ["Travel", "Cars", "Wildlife", "Technology", "Other"],
    setpicRes: (pics: []) => set({picRes: pics}),
    setTempIndex: (temporaryIndex: number) => set({tempIndex: temporaryIndex}),
    setSelectedImageIndex: (selectedImageIndex: number) => set({selectedImageIndex}),
    setSelectedPreference: (selectedPreference: string) => set({selectedPreference}),
    setOtherPreference: (otherPreference: string) => set({otherPreference}),
    setName: (name: string) => set({name}),
    setSurname: (surname: string) => set({surname}),
}))

export default usePicsStore
