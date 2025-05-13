import { getProductCategoryBySlug } from "@/features/products/actions";
import { Metadata } from "next";
import { NewProductClient } from "./client";

interface Props {
    params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
    title: "New Product - BuyAnything"
}

const NewProductPage = async ({ params }: Props) => {
    const { slug } = await params;

    const category = await getProductCategoryBySlug(slug);

    if (!category) {
        // Display layout
        return null;
    }

    return <NewProductClient category={category} />
}
 
export default NewProductPage;