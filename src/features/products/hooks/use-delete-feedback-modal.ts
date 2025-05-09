import { create } from "zustand";

interface DeleteFeedbackModalStore {
    isOpen: boolean;
    feedbackId: string | null;
    open: (feedbackId: string) => void;
    close: () => void;
}

export const useDeleteFeedbackModal = create<DeleteFeedbackModalStore>((set) => ({
    isOpen: false,
    feedbackId: null,
    open: (feedbackId) => set({ isOpen: true, feedbackId }),
    close: () => set({ isOpen: false, feedbackId: null }),
}));