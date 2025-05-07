import { type Metadata } from "next";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { DashboardClient } from "./client";

export const revalidate = 1800;

export const metadata: Metadata = {
    title: "Customer Dashboard - BuyAnything"
}

const DashboardPage = async () => {
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) return null;

    const orders = await prisma.order.findMany({ where: { customerEmail: session.user.email }, include: { products: true }, orderBy: { createdAt: "desc" } });

    return (
        <DashboardClient
            orders={orders}
        />
    )
}
 
export default DashboardPage;