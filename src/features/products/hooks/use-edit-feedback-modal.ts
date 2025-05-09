import { Feedback } from "@prisma/client";
import { create } from "zustand";

interface EditFeedbackModalStore {
    isOpen: boolean;
    feedback: Feedback | null;
    open: (feedback: Feedback) => void;
    close: () => void;
}

export const useEditFeedbackModal = create<EditFeedbackModalStore>((set) => ({
    isOpen: false,
    feedback: null,
    open: (feedback) => set({ isOpen: true, feedback }),
    close: () => set({ isOpen: false, feedback: null }),
}));