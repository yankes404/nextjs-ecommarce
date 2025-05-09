'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useDeleteFeedbackModal } from "../hooks/use-delete-feedback-modal";
import { useDeleteFeedback } from "../api/use-delete-feedback";

export const DeleteFeedbakModal = () => {
    const { mutate, isPending } = useDeleteFeedback();

    const { isOpen, open, close, feedbackId } = useDeleteFeedbackModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && feedbackId) ? open(feedbackId) : (!isPending && close());

    const deleteFeedback = () => feedbackId && mutate({ feedbackId });

    return (
        <AlertDialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your feedback.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteFeedback}
                        disabled={isPending}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}