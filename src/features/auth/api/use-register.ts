import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { type RegisterSchema } from "../schemas";
import { register } from "../actions";

export const useRegister = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (values: RegisterSchema) => register(values),
        onSuccess: (data, values) => {
            if (data.success) {
                toast.success(data.success);
                router.push(`/sign-in?email=${values.email}`);
            }

            if (data.error) {
                toast.error(data.error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}