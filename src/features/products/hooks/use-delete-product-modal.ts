import { create } from "zustand";

interface DeleteProductModalStore {
    isOpen: boolean;
    productId: string | null;
    open: (productId: string) => void;
    close: () => void;
}

export const useDeleteProductModal = create<DeleteProductModalStore>((set) => ({
    isOpen: false,
    productId: null,
    open: (productId) => set({ isOpen: true, productId }),
    close: () => set({ isOpen: false, productId: null }),
}));