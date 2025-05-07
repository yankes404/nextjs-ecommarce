'use client'

import { type Product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useShoppingCart } from "../hooks/use-shopping-cart";

export const ProductDetails = (product: Product) => {
    const isClient = typeof window !== "undefined";

    const { addProduct, isLoading } = useShoppingCart();

    return (
        <div className="grid -order-1 md:order-1">
            <h1 className="font-bold text-2xl">
                {product.name}
            </h1>
            <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="mt-1 md:mt-4 text-xs md:text-sm grid gap-2"
            />
            <h2 className="mt-6 font-bold text-2xl">
                ${product.price.toLocaleString("en-US")}
            </h2>
            <Separator className="my-6" />
            <div className="grid sm:grid-cols-2 gap-2">
                <Button
                    size="lg"
                >
                    Buy
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => addProduct(product.id)}
                    disabled={isClient ? isLoading : true}
                >
                    Add to cart
                </Button>
            </div>
        </div>
    )
}