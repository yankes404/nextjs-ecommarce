import { type Metadata } from "next";

import { getProductById } from "@/features/products/actions";
import { ProductImages } from "@/features/products/components/product-images";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export const revalidate = 1800;

interface Props {
    params: {
        productId: string;
    }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const product = await getProductById(params.productId);

    if (product) {
        return {
            title: `${product.name} - BuyAnything`,
            description: product.description,
        
        }
    } else {
        return {
            title: "Product not found - BuyAnything"
        }
    }
}

const ProductIdPage = async ({ params }: Props) => {
    const product = await getProductById(params.productId);

    return product && (
        <div className="min-h-svh flex flex-col">
            <Header />
            <main className="py-10 pt-0 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 grid lg:grid-cols-2 gap-12 items-start">
                <ProductImages images={product.images} />
                <div className="grid -order-1 md:order-1">
                    <h1 className="font-bold text-2xl">
                        {product.name}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: product.description }}
                        className="mt-1 md:mt-4 text-xs md:text-sm grid gap-2"
                    />
                    <div className="grid sm:grid-cols-2 gap-2 mt-6 md:mt-8">
                        <Button
                            size="lg"
                        >
                            Buy
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
 
export default ProductIdPage;