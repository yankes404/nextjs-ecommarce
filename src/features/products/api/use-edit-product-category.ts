import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";

import { ProductCategorySchema } from "../schemas";
import { editProductCategory } from "../actions";

interface MutationFnParams {
    productCategoryId: string;
    values: ProductCategorySchema;
}

export const useEditProductCategory = () => {
    const mutation = useMutation({
        mutationFn: ({ productCategoryId, values }: MutationFnParams) => editProductCategory(productCategoryId, values),
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