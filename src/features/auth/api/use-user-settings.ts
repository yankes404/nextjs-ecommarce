import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../actions";

export const useUserSettings = () => useQuery({
    queryKey: ["user-settings"],
    refetchInterval: 1000 * 60 * 60,
    queryFn: async () => getSettings()
});