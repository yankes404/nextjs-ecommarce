import { useQuery } from "@tanstack/react-query";

import { getProductCategories } from "../actions";

export const useProductsCategories = () => useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => getProductCategories(),
    refetchInterval: 1000 * 60 * 30
});