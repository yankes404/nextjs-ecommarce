import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";
import { deleteFeedback } from "../actions";

interface MutationFnParams {
    feedbackId: string;
}

export const useDeleteFeedback = () => {
    const mutation = useMutation({
        mutationFn: ({ feedbackId }: MutationFnParams) => deleteFeedback(feedbackId),
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