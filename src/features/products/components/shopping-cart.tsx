'use client'

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useShoppingCart } from "../hooks/use-shopping-cart";
import { ShoppingCartProductCard } from "./shopping-cart-product-card";

interface Props {
    children: React.ReactNode;
}

export const ShoppingCart = ({ children }: Props) => {
    const { products } = useShoppingCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="shrink-0">
                    <SheetTitle>
                        Shopping Cart
                    </SheetTitle>
                    <SheetDescription>
                        {products.length} product(s)
                    </SheetDescription>
                </SheetHeader>
                <div className="w-full px-4 flex flex-col gap-2.5 flex-grow overflow-y-auto">
                    {products.map((product, key) => <ShoppingCartProductCard key={key} index={key} {...product} />)}
                </div>
                <SheetFooter className="shrink-0">
                    <p className="text-sm">Total: <span className="font-semibold">${products.reduce((acc, curr) => acc + curr.price, 0).toLocaleString("en-US")}</span></p>
                    <Button
                        size="lg"
                        disabled={products.length === 0}
                    >
                        Go to Checkout
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}