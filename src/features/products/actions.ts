'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { type FeedbackSchema, feedbackSchema } from "./schemas";

export const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id }
    });
    
    return product;
}

export const getProductsByIds = async (ids: string[]) => {
    const products = await prisma.product.findMany({ where: { id: { in: ids } } });
    return products;
}

export const getProductsByStripeIds = async (ids: string[]) => {
    const products = await prisma.product.findMany({ where: { stripeId: { in: ids } } });
    return products;
}

export const getProductFeedbacks = async (productId: string) => {
    const session = await auth();
    const feedbacks = await prisma.feedback.findMany({ where: { productId }, orderBy: { createdAt: "desc" }, include: { user: true } });

    const filteredFeedbacks = feedbacks
        .filter((feedback) => {
            const { isHidden } = feedback;
            const isMine = feedback.userId === session?.user?.id;
            return !isHidden || isMine;
        })

    return session?.user.role === "ADMIN" ? feedbacks : filteredFeedbacks;
}

export const createFeedback = async (
    productId: string,
    values: FeedbackSchema
) => {
    try {
        const validatedFields = feedbackSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            stars,
            content
        } = validatedFields.data;
    
        const session = await auth();
    
        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }
    
        const product = await prisma.product.findUnique({ where: { id: productId } });
    
        if (!product) {
            return { error: "Product does not exist" }
        }
    
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
        if (!user) {
            return { error: "User does not exist" }
        }

        const orders = await prisma.order.findMany({ where: { customerEmail: user.email }, include: { products: true } });

        // TODO: if order not delivered don't allow creating feedback

        if (!orders.some((order) => order.products.some((product) => product.id === productId))) {
            return { error: "You have not ordered this product" }
        }
    
        await prisma.feedback.create({
            data: {
                stars,
                content,
                productId: product.id,
                userId: user.id
            },
            include: { user: true }
        });
    
        return { success: "You have successfully submitted your feedback" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const editFeedback = async (
    feedbackId: string,
    values: FeedbackSchema
) => {
    try {
        const validatedFields = feedbackSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        const {
            stars,
            content
        } = validatedFields.data;

        const session = await auth();

        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }

        const feedback = await prisma.feedback.findUnique({ where: { id: feedbackId } });

        if (!feedback) {
            return { error: "Feedback does not exist" }
        }

        if (feedback.userId !== session.user.id) {
            return { error: "You are not allowed to edit this feedback" }
        }

        await prisma.feedback.update({
            where: { id: feedback.id },
            data: {
                stars,
                content,
                isEdited: true
            }
        });

        return { success: "You have successfully edited your feedback" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const deleteFeedback = async (feedbackId: string) => {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }

        const feedback = await prisma.feedback.findUnique({ where: { id: feedbackId } });

        if (!feedback) {
            return { error: "Feedback does not exist" }
        }

        if (feedback.userId !== session.user.id) {
            return { error: "You are not allowed to delete this feedback" }
        }

        await prisma.feedback.delete({ where: { id: feedback.id } });
    
        return { success: "You have successfully deleted your feedback" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const setFeedbackVisibility = async (feedbackId: string, value: boolean) => {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }

        const user = await prisma.user.findUnique({ where: { id: session.user.id } });

        if (!user) {
            return { error: "User does not exist" }
        }

        if (user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const feedback = await prisma.feedback.findUnique({ where: { id: feedbackId } });

        if (!feedback) {
            return { error: "Feedback does not exist" }
        }

        await prisma.feedback.update({
            where: { id: feedback.id },
            data: {
                isHidden: value
            }
        });

        return { success: `You have successfully ${value ? "hide" : "unhide"} feedback` }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}