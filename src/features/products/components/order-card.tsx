import { format } from "date-fns";
import { Product, type Order as Props } from "@prisma/client";

import { cn } from "@/lib/utils";

export const OrderCard = ({
    status,
    products,
    createdAt,
}: Props & { products: Product[] }) => {
    return (
        <div
            className="w-full flex justify-between items-center gap-3.5"
        >
            <div className="grid gap-0.5">
                <h3 className="font-bold">
                    {products.map(product => product.name).slice(0, 3).join(", ") + (products.length > 3 ? `, and ${products.length - 3} more` : "")}
                </h3>
                <div className="text-sm inline-flex items-center gap-2">
                    <span>
                        ${products.reduce((acc, curr) => acc + curr.price, 0).toLocaleString("en-US")}
                    </span>
                    <div className="size-1.5 rounded-full bg-foreground" />
                    <span>
                        {format(new Date(createdAt), "PPP p")}
                    </span>
                </div>
            </div>
            <div className="text-xs capitalize font-medium flex px-2 py-1 rounded-full shadow-xs border items-center gap-1">
                <div
                    className={cn(
                        "size-2 rounded-full",
                        status === "CANCELLED" && "bg-red-500",
                        status === "PENDING" && "bg-amber-500",
                        status === "DELIVERED" && "bg-green-500",
                    )}
                />
                {status.toLowerCase()}
            </div>
        </div>
    )
}