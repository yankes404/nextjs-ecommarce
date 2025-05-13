'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { type FeedbackSchema, feedbackSchema, productCategorySchema, type ProductCategorySchema, productSchema, type ProductSchema } from "./schemas";

export const getProductCategoryBySlug = async (slug: string, withProducts = false) => {
    const category = await prisma.productCategory.findUnique({ where: { slug }, include: { products: withProducts } });
    return category;
}

export const getProductCategories = async () => {
    const categories = await prisma.productCategory.findMany();
    return categories;
}

export const getProductsByCategoryId = async (categoryId: string) => {
    const products = prisma.product.findMany({ where: { category: { id: categoryId } } });
    return products;
}

export const createProductCategory = async (values: ProductCategorySchema) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const validatedFields = productCategorySchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const { slug, name } = validatedFields.data;

        const existingCategory = await prisma.productCategory.findUnique({ where: { slug } });
    
        if (existingCategory) {
            return { error: "Slug must be unique" }
        }
    
        await prisma.productCategory.create({ data: { slug, name } });
        return { success: "Category has been created successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const editProductCategory = async (id: string, values: ProductCategorySchema) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const validatedFields = productCategorySchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const { slug, name } = validatedFields.data;

        const existingCategory = await prisma.productCategory.findUnique({ where: { id } });
    
        if (!existingCategory) {
            return { error: "Category does not exist" }
        }
    
        await prisma.productCategory.update({ where: { id }, data: { slug, name } });
        return { success: "Category has been updated successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const deleteProductCategory = async (id: string) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const existingCategory = await prisma.productCategory.findUnique({ where: { id } });
    
        if (!existingCategory) {
            return { error: "Category does not exist" }
        }

        await prisma.productCategory.delete({ where: { id } });
        return { success: "Category has been deleted successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

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

export const createProduct = async (values: ProductSchema) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const validatedFields = productSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            name,
            slug,
            stripeId,
            price,
            description,
            categoryId
        } = validatedFields.data;

        const existingProduct = await prisma.product.findFirst({ where: { OR: [{ stripeId }, { slug }] } });

        if (existingProduct) {
            return { error: "Slug or Stripe ID already in use" }
        }

        const category = await prisma.productCategory.findUnique({ where: { id: categoryId } });

        if (!category) {
            return { error: "Category does not exist" }
        }

        await prisma.product.create({
            data: {
                name,
                slug,
                stripeId,
                price,
                description,
                categoryId: category.id
            }
        });

        return { success: "Product has been created successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const editProduct = async (
    id: string,
    values: ProductSchema
) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const validatedFields = productSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            name,
            slug,
            stripeId,
            price,
            description,
            categoryId
        } = validatedFields.data;

        const existingProduct = await prisma.product.findUnique({ where: { id } });
    
        if (!existingProduct) {
            return { error: "Product does not exist" }
        }

        const category = await prisma.productCategory.findUnique({ where: { id: categoryId } });

        if (!category) {
            return { error: "Category does not exist" }
        }

        await prisma.product.update({ where: { id }, data: { name, slug, stripeId, price, description, categoryId: category.id } });

        return { success: "Product has been updated successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const session = await auth();

        if (!session || !session.user || session.user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }

        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) {
            return { error: "Product does not exist" }
        }

        await prisma.product.delete({ where: { id } });

        return { success: "Product has been deleted successfully" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
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