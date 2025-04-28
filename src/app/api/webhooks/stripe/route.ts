import { getProductsByStripeIds } from "@/features/products/actions";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;
    
    try {
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        const data = event.data;
        const eventType = event.type;

        if (eventType === "checkout.session.completed") {
            const session = await stripe.checkout.sessions.retrieve(
                // @ts-expect-error data.object.id as a type is not a string, so this is the only way to pass this as an argument to this function
                data.object.id as string,
                {
                    expand: ["line_items"]
                }
            );
    
            // const customerEmail = session.customer_email;
            const lineItems = session.line_items?.data;

            if (!lineItems) {
                throw new Error("No line items");
            }

            const priceIds = lineItems.map((item) => item.price?.id).filter(Boolean) as string[];
            if (priceIds.length !== lineItems.length || priceIds.length === 0) {
                throw new Error("No price ids");
            }

            const products = await getProductsByStripeIds(priceIds);
            if (products.length !== priceIds.length) {
                throw new Error("No products");
            }

            // TODO: Send an email to the customer
            // TODO: Send an email to me
            // TODO: For future use shippo to sumulate shipping

            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}