import { useQuery } from "@tanstack/react-query"
import { getProductCategoryBySlug } from "../actions"

export const useProductCategoryBySlug = (
    slug: string,
    withProducts = false
) => {
    const query = useQuery({
        queryKey: ["product-category", slug, withProducts],
        queryFn: async () => getProductCategoryBySlug(slug, withProducts),
        refetchInterval: 1000 * 60 * 30
    });

    return query;
}