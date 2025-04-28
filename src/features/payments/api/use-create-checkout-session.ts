import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { type Product } from "@prisma/client";

import { stripePromise } from "@/lib/stripe";

import { createCheckoutSession } from "../actions";

export const useCreateCheckoutSession = () => {
    const mutation = useMutation({
        mutationFn: async (products: Product[]) => {
            const { sessionId, error } = await createCheckoutSession(products, window.location.pathname);

            if (error || !sessionId) {
                toast.error(error ?? "Something went wrong");
                return;
            }

            const stripe = await stripePromise;

            stripe?.redirectToCheckout({ sessionId });
        }
    });

    return mutation;
}