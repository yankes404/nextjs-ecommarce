import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProduct } from "../actions";
import { type ProductSchema } from "../schemas";
import { queryClient } from "@/components/query-provider";

export const useCreateProduct = () => {
    const router = useRouter();
    const params = useParams();

    const mutation = useMutation({
        mutationFn: (values: ProductSchema) => createProduct(values),
        onSuccess: ({ success, error }, values) => {
            if (success) {
                toast.success(success);

                const categorySlug = params.slug;

                
                if (categorySlug) {
                    queryClient.invalidateQueries({ queryKey: ["product-category", categorySlug, true] });
                    router.push(`/admin/products/${categorySlug}/${values.slug}`);
                }
            }

            if (error) {
                toast.error(error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}