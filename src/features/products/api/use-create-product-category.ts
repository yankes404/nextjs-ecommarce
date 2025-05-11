import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

import { queryClient } from "@/components/query-provider";

import { ProductCategorySchema } from "../schemas";
import { createProductCategory } from "../actions";

export const useCreateProductCategory = () => {
    const mutation = useMutation({
        mutationFn: (values: ProductCategorySchema) => createProductCategory(values),
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