import { create } from "zustand";

interface CreateProductCategoryModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useCreateProductCategoryModal = create<CreateProductCategoryModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));