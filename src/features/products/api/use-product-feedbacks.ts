import { useQuery } from "@tanstack/react-query"
import { getProductFeedbacks } from "../actions"

export const useProductFeedbacks = (productId: string) => {
    const query = useQuery({
        queryKey: ["product-feedbacks", productId],
        queryFn: async () => getProductFeedbacks(productId),
        refetchInterval: 1_800_000
    });

    return query;
}