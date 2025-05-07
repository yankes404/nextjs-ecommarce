'use client'

import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { type Product } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { useShoppingCart } from "../hooks/use-shopping-cart";
import { ChangeProductCountModal } from "./change-product-count-modal";

export const ShoppingCartProductCard = ({
    count,
    id,
    name,
    price,
    images
}: Product & { count: number; }) => {
    const { removeProduct, changeProductCount } = useShoppingCart();

    const onCountChange = (count: number) => changeProductCount(id, count);

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
                <div className="flex items-center gap-2.5">
                    <ChangeProductCountModal
                        initialCount={count}
                        onCountChange={onCountChange}
                    >
                        <Button
                            size="sm"
                            variant="outline"
                            className="px-3 h-7"
                        >
                            {count.toLocaleString("en-US")}
                        </Button>
                    </ChangeProductCountModal>
                    <div className="size-0.5 rounded-full bg-foreground shrink-0" />
                    <p className="text-sm text-muted-foreground">
                        ${price.toLocaleString("en-US")}
                    </p>
                </div>
            </div>
            <Button
                size="icon"
                variant="outline"
                className="ml-auto"
                onClick={() => removeProduct(id)}
            >
                <Trash2Icon />
            </Button>
        </div>
    )
}