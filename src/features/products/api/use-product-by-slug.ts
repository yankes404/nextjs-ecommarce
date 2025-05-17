import { useQuery } from "@tanstack/react-query";

import { getProductBySlug } from "../actions";

export const useProductBySlug = (slug: string) => {
    const query = useQuery({
        queryKey: ["product", slug],
        queryFn: async () => getProductBySlug(slug),
    });

    return query;
}