import { type Metadata } from "next";
import Link from "next/link";
import { HomeIcon, XCircleIcon } from "lucide-react";

import { getProductById } from "@/features/products/actions";
import { ProductImages } from "@/features/products/components/product-images";
import { ProductDetails } from "@/features/products/components/product-details";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { FeedbacksList } from "@/features/products/components/feedbacks-list";

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
                <main className="py-10 pt-0 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex flex-col gap-24">
                    <section className="grid lg:grid-cols-2 gap-12 items-start">
                        <ProductImages images={product.images} />
                        <ProductDetails {...product} />
                    </section>
                    <section className="grid lg:grid-cols-2 gap-12 items-start">
                        <FeedbacksList
                            productId={product.id}
                        />
                    </section>
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