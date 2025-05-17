import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

import { deleteProduct } from "../actions"
import { queryClient } from "@/components/query-provider";
import { useRouter } from "next/navigation";

export const useDeleteProduct = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: ({ success, error, product }) => {
            if (success) {
                if (product) {
                    queryClient.invalidateQueries({ queryKey: ["product", product.slug] });
                    queryClient.invalidateQueries({ queryKey: ["product-category", product.slug, true ] });
                    queryClient.invalidateQueries({ queryKey: ["product-category", product.slug, false ] });
                    
                    router.push(`/admin/products/${product.category.slug}`);
                }
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