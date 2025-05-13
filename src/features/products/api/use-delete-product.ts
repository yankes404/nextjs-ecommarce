import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

import { deleteProduct } from "../actions"

export const useDeleteProduct = () => {
    const mutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
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