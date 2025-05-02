'use client'

import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Order, Product } from "@prisma/client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { OrderCard } from "./order-card";

interface Props {
    orders: Array<Order & { products: Product[] }>;
}

export const OrdersList = ({ orders }: Props) => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch] = useDebounce(searchValue, 500);

    const filteredOrders = useMemo(() => orders.filter((order) => order.products.some((product) => product.name.toLowerCase().includes(debouncedSearch.toLowerCase()))), [orders, debouncedSearch]);

    return (
        <Card>
            <CardHeader>
                <div className="relative">
                    <SearchIcon className="size-4 shrink-0 absolute left-4 top-1/2 -translate-y-1/2" />
                    <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        type="search"
                        placeholder="Search..."
                        className="ps-10"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 max-h-[488px] overflow-y-auto">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                    <OrderCard
                        key={order.id}
                        {...order}
                    />
                )) : (
                    <p className="text-center">
                        No orders found
                    </p>
                )}
            </CardContent>
        </Card>
    )
}