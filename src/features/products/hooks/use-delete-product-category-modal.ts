import { create } from "zustand";

interface DeleteProductCategoryModalStore {
    isOpen: boolean;
    productCategoryId: string | null;
    open: (productCategoryId: string) => void;
    close: () => void;
}

export const useDeleteProductCategoryModal = create<DeleteProductCategoryModalStore>((set) => ({
    isOpen: false,
    productCategoryId: null,
    open: (productCategoryId) => set({ isOpen: true, productCategoryId }),
    close: () => set({ isOpen: false, productCategoryId: null }),
}));