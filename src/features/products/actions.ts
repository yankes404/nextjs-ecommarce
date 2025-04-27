'use server';

import { prisma } from "@/lib/prisma";

export const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
}