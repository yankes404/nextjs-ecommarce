'use client'

import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { type Product } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { useShoppingCart } from "../hooks/use-shopping-cart";

export const ShoppingCartProductCard = ({
    index,
    name,
    price,
    images
}: Product & { index: number; }) => {
    const { removeProduct } = useShoppingCart();

    return (
        <div
            className="p-2 rounded-lg border flex items-center gap-2.5"
        >
            {images.length > 0 && (
                <Image
                    src={images[0]}
                    alt={name}
                    height={64}
                    width={64}
                    className="h-full aspect-square object-cover object-center"
                />
            )}
            <div className="grid">
                <h3 className="font-bold text-lg line-clamp-1">
                    {name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    ${price.toLocaleString("en-US")}
                </p>
            </div>
            <Button
                size="icon"
                variant="outline"
                className="ml-auto"
                onClick={() => removeProduct(index)}
            >
                <Trash2Icon />
            </Button>
        </div>
    )
}