'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeDollarSign, BanknoteArrowUpIcon, BoxIcon, UsersIcon } from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Users",
        url: "/admin/users",
        icon: UsersIcon
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: BoxIcon
    },
    {
        title: "Discounts",
        url: "/admin/discounts",
        icon: BadgeDollarSign
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: BanknoteArrowUpIcon
    },
]

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarContent className="p-6">
                <SidebarHeader className="text-lg font-bold">
                    Admin Dashboard
                </SidebarHeader>
                <SidebarMenu className="flex-grow">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:pointer-events-none"
                                data-active={pathname === item.url}
                                asChild
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarFooter>
                    <UserButton />
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}