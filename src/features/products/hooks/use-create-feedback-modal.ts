import { create } from "zustand";

interface CreateFeedbackModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useCreateFeedbackModal = create<CreateFeedbackModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));