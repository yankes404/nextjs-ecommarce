import { Metadata } from "next";

import { ProductsSlugClient } from "./client";
import { getProductCategoryBySlug } from "@/features/products/actions";

interface Props {
    params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params;

    const productCategory = await getProductCategoryBySlug(slug);

    if (!productCategory) {
        return {
            title: "Not Found - BuyAnything"
        }
    }

    return {
        title: `${productCategory.name} - BuyAnything`
    }
}

const ProductsSlugPage = async ({ params }: Props) => {
    const { slug } = await params;

    return <ProductsSlugClient slug={slug} />
}
 
export default ProductsSlugPage;