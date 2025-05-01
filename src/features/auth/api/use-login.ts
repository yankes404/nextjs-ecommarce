import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { type LoginSchema } from "../schemas";
import { login } from "../actions";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const mutation = useMutation({
        mutationFn: (values: LoginSchema) => login(values),
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.success);

                const callbackUrl = searchParams.get('callback_url') ?? DEFAULT_LOGIN_REDIRECT;
                router.push(callbackUrl);
            }

            if (data.error) {
                toast.error(data.error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}