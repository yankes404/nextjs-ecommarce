import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";

import { FeedbackSchema } from "../schemas";
import { createFeedback } from "../actions";

interface MutationFnParams {
    productId: string;
    values: FeedbackSchema;
}

export const useCreateFeedback = () => {
    const mutation = useMutation({
        mutationFn: ({ productId, values }: MutationFnParams) => createFeedback(productId, values),
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