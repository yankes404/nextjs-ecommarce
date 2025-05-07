import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { verifyEmail } from "../actions";

export const useVerifyEmail = () => {
    const { update } = useSession();

    const mutation = useMutation({
        mutationFn: (token: string) => verifyEmail(token),
        onSuccess: ({ success, newEmail, error }) => {
            if (success) {
                if (newEmail) {
                    update({ email: newEmail });
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