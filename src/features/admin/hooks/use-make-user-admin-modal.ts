import { create } from "zustand";

interface MakeUserAdminModalStore {
    isOpen: boolean;
    userId: string | null;
    open: (userId: string) => void;
    close: () => void;
}

export const useMakeUserAdminModal = create<MakeUserAdminModalStore>((set) => ({
    isOpen: false,
    userId: null,
    open: (userId) => set({ isOpen: true, userId }),
    close: () => set({ isOpen: false, userId: null }),
}));