'use client'

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import type { Order, Product } from "@prisma/client";

import { OrderCard } from "@/features/products/components/order-card";
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
    orders: Array<Order & { products: Product[]}>;
}

export const DashboardClient = ({ orders }: Props) => {
    const [page, setPage] = useState<"orders" | "settings">("orders");
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch] = useDebounce(searchValue, 500);

    const filteredOrders = useMemo(() => orders.filter((order) => order.products.some((product) => product.name.toLowerCase().includes(debouncedSearch.toLowerCase()))), [orders, debouncedSearch]);

    return (
        <div className="min-h-svh flex flex-col">
            <Header />
            <main className="py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 grid place-items-center">
                <Tabs
                    value={page}
                    onValueChange={(value) => setPage(value as "orders" | "settings")}
                    defaultValue="orders"
                    className="w-full max-w-screen-sm"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders">
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
                    </TabsContent>
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-center">Settings</CardTitle>
                                <CardDescription className="text-center">
                                    Manage your account settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                Settings
                            </CardContent>
                            <CardFooter>
                                <Button size="lg" type="submit" className="ml-auto w-52">Save</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    )
}