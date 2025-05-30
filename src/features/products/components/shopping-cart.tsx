'use client'

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useShoppingCart } from "../hooks/use-shopping-cart";
import { ShoppingCartProductCard } from "./shopping-cart-product-card";
import { useCreateCheckoutSession } from "@/features/payments/api/use-create-checkout-session";
import { LoaderIcon } from "lucide-react";
import { Hint } from "@/components/ui/extensions/hint";

interface Props {
    children: React.ReactNode;
}

export const ShoppingCart = ({ children }: Props) => {
    const { products, isLoading } = useShoppingCart();

    const { mutate: createCheckoutSession, isPending } = useCreateCheckoutSession();

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
                    {isLoading ? (
                        <LoaderIcon className="animate-spin text-muted-foreground shrink-0 size-4 mx-auto" />
                    ) : products.length > 0 ? products.map((product, key) => (
                        <ShoppingCartProductCard key={key} {...product} />
                    )) : (
                        <Hint className="mx-auto">Your cart is empty</Hint>
                    )}
                </div>
                <SheetFooter className="shrink-0">
                    <p className="text-sm">Total: <span className="font-semibold">${products.reduce((acc, curr) => acc + curr.price * curr.count, 0).toLocaleString("en-US")}</span></p>
                    <Button
                        size="lg"
                        disabled={products.length === 0 || isPending}
                        onClick={() => createCheckoutSession(products)}
                    >
                        Go to Checkout
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}