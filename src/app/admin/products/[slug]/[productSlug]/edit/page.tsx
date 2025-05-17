import { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { EditProductClient } from "./client";

export const revalidate = 1800;

interface Props {
    params: Promise<{
        slug: string;
        productSlug: string;
    }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { productSlug } = await params;

    const product = await prisma.product.findUnique({ where: { slug: productSlug } });
    
    const title = product ? `Edit ${product.name} - BuyAnything` : "Product not found - BuyAnything";

    return {
        title
    }
}

const EditProductPage = async ({ params }: Props) => {
    const { productSlug } = await params;

    const product = await prisma.product.findUnique({ where: { slug: productSlug }, include: { category: true  } });
    
    if (!product) {
        notFound();
    }

    return (
        <EditProductClient
            product={product}
        />
    )
}
 
export default EditProductPage;