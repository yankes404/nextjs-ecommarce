import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";

import { FeedbackSchema } from "../schemas";
import { editFeedback } from "../actions";

interface MutationFnParams {
    feedbackId: string;
    values: FeedbackSchema;
}

export const useEditFeedback = () => {
    const mutation = useMutation({
        mutationFn: ({ feedbackId, values }: MutationFnParams) => editFeedback(feedbackId, values),
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