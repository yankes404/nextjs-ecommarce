'use server';

import Stripe from 'stripe';
import { Product } from '@prisma/client';

import { StripePaymentStatus } from './types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = async (products: Product[], currentUrl = "/") => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: products.map((product) => ({
                price: product.stripeId,
                quantity: 1
            })),
            mode: "payment",
            success_url: "http://localhost:3000/payment-successed?id={CHECKOUT_SESSION_ID}",
            cancel_url: `http://localhost:3000/payment-cancelled?callback_url=${currentUrl}`,
        });
    
        return { sessionId: session.id };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
}

export const retrieveSessionStatus = async (id: string): Promise<{ status: StripePaymentStatus | null }> => {
    try {
        if (!id) return { status: null }
    
        const session = await stripe.checkout.sessions.retrieve(id);
    
        if (!session) return { status: null }
    
        return { status: session.status }
    } catch (error) {
        console.error(error);
        return { status: null }
    }
}