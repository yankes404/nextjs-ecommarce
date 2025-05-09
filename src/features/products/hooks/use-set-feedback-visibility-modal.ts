import { create } from "zustand";
import { Feedback } from "@prisma/client";

interface SetFeedbacVisibilitykModalStore {
    isOpen: boolean;
    feedback: Feedback | null;
    open: (feedback: Feedback) => void;
    close: () => void;
}

export const useSetFeedbackVisibilityModal = create<SetFeedbacVisibilitykModalStore>((set) => ({
    isOpen: false,
    feedback: null,
    open: (feedback) => set({ isOpen: true, feedback }),
    close: () => set({ isOpen: false, feedback: null }),
}));