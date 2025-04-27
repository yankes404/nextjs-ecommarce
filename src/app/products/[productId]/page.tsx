import { type Metadata } from "next";

import { getProductById } from "@/features/products/actions";
import { ProductImages } from "@/features/products/components/product-images";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/features/products/components/product-details";
import { HomeIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 1800;

interface Props {
    params: Promise<{
        productId: string;
    }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { productId } = await params;
    const product = await getProductById(productId);

    if (product) {
        return {
            title: `${product.name} - BuyAnything`,
            description: product.description,
        };
    } else {
        return {
            title: "Product not found - BuyAnything",
        };
    }
};

const ProductIdPage = async ({ params }: Props) => {
    const { productId } = await params;
    const product = await getProductById(productId);

    return (
        <div className="min-h-svh flex flex-col">
            <Header />
            {product ? (
                <main className="py-10 pt-0 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 grid lg:grid-cols-2 gap-12 items-start">
                    <ProductImages images={product.images} />
                    <ProductDetails {...product} />
                </main>
            ) : (
                <main className="py-10 pt-0 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex flex-col justify-center items-center gap-2.5">
                    <XCircleIcon className="size-5" />
                    <span>
                        Product not found
                    </span>
                    <Button asChild>
                        <Link href="/">
                            <HomeIcon />
                            Home
                        </Link>
                    </Button>
                </main>
            )}
            <Footer />
        </div>
    );
};

export default ProductIdPage;