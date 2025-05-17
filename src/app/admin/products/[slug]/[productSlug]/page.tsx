import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import { ProductSlugClient } from "./client";

export const revalidate = 1800;

interface Props {
    params: Promise<{ slug: string; productSlug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { productSlug } = await params;
    const product = await prisma.product.findUnique({ where: { slug: productSlug } });

    return {
        title: `${product?.name ?? "Product not found"} - BuyAnything`
    }
}

const ProductSlugPage = async ({ params }: Props) => {
    const { productSlug } = await params;

    return <ProductSlugClient slug={productSlug} />
}
 
export default ProductSlugPage;