import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type ProductSchema } from "../schemas";
import { editProduct } from "../actions";

interface Values {
    id: string;
    values: ProductSchema;
}

export const useEditProduct = () => {
    const mutation = useMutation({
        mutationFn: ({ id, values }: Values) => editProduct(id, values),
        onSuccess: ({ success, error }) => {
            if (success) {
                // TODO: Revalidate query
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