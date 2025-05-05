import { create } from "zustand";

interface ImagesLightboxStore {
    isOpen: boolean;
    images: string[];
    open: (images: string[]) => void;
    close: () => void;
}

export const useImagesLightbox = create<ImagesLightboxStore>((set) => ({
    isOpen: false,
    images: [],
    open: (images) => {
        if (images.length === 0) {
            throw new Error("No images provided");
        }

        set({ isOpen: true, images });
    },
    close: () => set({ isOpen: false, images: [] }),
}));