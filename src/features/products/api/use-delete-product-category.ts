import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";
import { deleteProductCategory } from "../actions";

interface MutationFnParams {
    productCategoryId: string;
}

export const useDeleteProductCategory = () => {
    const mutation = useMutation({
        mutationFn: ({ productCategoryId }: MutationFnParams) => deleteProductCategory(productCategoryId),
        onSuccess: ({ success, error }) => {
            if (success) {
                queryClient.invalidateQueries({ queryKey: ["product-categories"] });
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