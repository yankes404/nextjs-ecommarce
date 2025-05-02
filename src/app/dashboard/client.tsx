'use client'

import { parseAsStringEnum, useQueryState } from "nuqs";
import type { Order, Product } from "@prisma/client";

import { OrdersList } from "@/features/products/components/orders-list";
import { SettingsCard } from "@/features/auth/components/settings-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
    orders: Array<Order & { products: Product[]}>;
}

export const DashboardClient = ({ orders }: Props) => {
    // const [page, setPage] = useState<"orders" | "settings">("orders");
    const [page, setPage] = useQueryState("page", parseAsStringEnum(["orders", "settings"]).withDefault("orders"));

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
                        <OrdersList orders={orders} />
                    </TabsContent>
                    <TabsContent value="settings">
                        <SettingsCard />
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    )
}