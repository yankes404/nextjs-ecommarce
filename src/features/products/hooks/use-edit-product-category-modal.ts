import { create } from "zustand";
import { ProductCategory } from "@prisma/client";

interface EditProductCategoryModal {
    isOpen: boolean;
    productCategory: ProductCategory | null;
    open: (productCategory: ProductCategory) => void;
    close: () => void;
}

export const useEditProductCategoryModal = create<EditProductCategoryModal>((set) => ({
    isOpen: false,
    productCategory: null,
    open: (productCategory) => set({ isOpen: true, productCategory }),
    close: () => set({ isOpen: false, productCategory: null })
}));