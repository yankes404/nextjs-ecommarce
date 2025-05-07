'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogInIcon, ShoppingCartIcon, UserPlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ShoppingCart } from "@/features/products/components/shopping-cart";
import { UserButton } from "@/features/auth/components/user-button";
import { useShoppingCart } from "@/features/products/hooks/use-shopping-cart";

import { Button } from "./ui/button";
import { ThemeSelect } from "./theme-select";

type Props = Omit<React.ComponentProps<"header">, "children">;

export const Header = ({ className, ...props }: Props) => {
    const isClient = typeof window !== "undefined";

    const { data: session } = useSession();
    const { isLoading: isShoppingCartLoading } = useShoppingCart();

    return (
        <header
            className={cn("w-screen px-4 py-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex justify-between items-center gap-3.5", className)}
            {...props}
        >
            <Link
                href="/"
                className="font-bold hover:opacity-80 transition"
            >
                BuyAnything
            </Link>
            <div className="flex">
                {session && session.user ? <UserButton /> : (
                    <>
                        <Button className="mr-2" asChild>
                            <Link href="/sign-in">
                                <span className="hidden md:inline">
                                    Sign in
                                </span>
                                <LogInIcon className="md:hidden" />
                                <span className="sr-only md:hidden">Sign ins</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/sign-up">
                                <span className="hidden md:inline">
                                    Sign up
                                </span>
                                <UserPlusIcon className="md:hidden" />
                                <span className="sr-only md:hidden">Sign up</span>
                            </Link>
                        </Button>
                    </>
                )}
                <div className="w-[1px] h-6 bg-foreground/25 my-auto mx-6" />
                <ThemeSelect />
                <ShoppingCart>
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={isClient ? isShoppingCartLoading : true}
                        className="ml-2"
                    >
                        <ShoppingCartIcon />
                    </Button>
                </ShoppingCart>
            </div>
        </header>
    )
}