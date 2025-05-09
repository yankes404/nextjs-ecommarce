import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../actions";

export const useUsers = () => {
    const query = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
        refetchInterval: 1000 * 60 * 30
    });

    return query;
}