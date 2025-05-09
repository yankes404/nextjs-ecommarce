import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";

import { setFeedbackVisibility } from "../actions";

interface MutationFnParams {
    feedbackId: string;
    hide: boolean;
}

export const useSetFeedbackVisibility = () => {
    const mutation = useMutation({
        mutationFn: ({ feedbackId, hide }: MutationFnParams) => setFeedbackVisibility(feedbackId, hide),
        onSuccess: ({ success, error }) => {
            if (success) {
                queryClient.invalidateQueries({ queryKey: ["product-feedbacks"] });
                toast.success(success);
            }

            if (error) {
                toast.error(error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}