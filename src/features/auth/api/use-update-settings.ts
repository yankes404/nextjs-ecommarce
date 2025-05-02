import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { SettingsSchema } from "../schemas";
import { updateSettings } from "../actions";
import { queryClient } from "@/components/query-provider";

export const useUpdateSettings = () => {
    const { update } = useSession();

    const mutation = useMutation({
        mutationFn: (values: SettingsSchema) => updateSettings(values),
        onSuccess: ({ success, error }, values) => {
            if (success) {
                update({ email: values.email, name: values.name });
                toast.success(success);
                queryClient.invalidateQueries({ queryKey: ["user-settings"] });
            }
    
            if (error) {
                toast.error(error);
            }
        },
        onError: () => toast.error("Something went wrong")
    });

    return mutation;
}