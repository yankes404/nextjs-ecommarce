import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/components/query-provider";

import { makeUserAdmin } from "../actions";

export const useMakeUserAdmin = () => {
    const mutation = useMutation({
        mutationFn: (userId: string) => makeUserAdmin(userId),
        onSuccess: ({ success, error }) => {
            if (success) {
                queryClient.invalidateQueries({ queryKey: ["users"] });
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