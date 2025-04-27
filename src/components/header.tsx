import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

type Props = Omit<React.ComponentProps<"header">, "children">;

export const Header = ({ className, ...props }: Props) => {
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
            <Button
                size="icon"
                variant="outline"
            >
                <ShoppingCartIcon />
            </Button>
        </header>
    )
}