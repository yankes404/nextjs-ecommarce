'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useSetFeedbackVisibilityModal } from "../hooks/use-set-feedback-visibility-modal";
import { useSetFeedbackVisibility } from "../api/use-set-feedback-visibility";

export const SetFeedbackVisibilityModal = () => {
    const { mutate, isPending } = useSetFeedbackVisibility();

    const { isOpen, open, close, feedback } = useSetFeedbackVisibilityModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && feedback) ? open(feedback) : (!isPending && close());

    const setVisibility = () => {
        if (feedback) {
            mutate({
                feedbackId: feedback.id,
                hide: !feedback.isHidden
            });    
        }
    }

    return (
        <AlertDialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={setVisibility}
                        disabled={isPending}
                    >
                        {feedback?.isHidden ? 'Show' : 'Hide'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}