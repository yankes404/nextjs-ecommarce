import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { type PasswordSchema } from "../schemas";
import { resetPassword } from "../actions";

export const useResetPassword = () => {
    const searchParams = useSearchParams();

    const mutation = useMutation({
        mutationFn: async (values: PasswordSchema) => {
            const token = searchParams.get('token');

            if (!token) {
                throw new Error("Invalid token");
            }

            return await resetPassword(token, values);
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);
            }

            if (data.error) {
                toast.error(data.error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}