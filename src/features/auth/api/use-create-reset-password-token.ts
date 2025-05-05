import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { type EmailSchema } from "../schemas";
import { createResetPasswordToken } from "../actions";

export const useCreateResetPasswordToken = () => {
    const mutation = useMutation({
        mutationFn: (values: EmailSchema) => createResetPasswordToken(values),
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