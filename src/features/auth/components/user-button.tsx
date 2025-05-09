'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboardIcon, LogOutIcon, ShieldIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { UserImage } from "./user-image";

export const UserButton = () => {
    const { data: session } = useSession();

    return session && session.user && (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <UserImage
                    image={session.user.image}
                    name={session.user.name}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                sideOffset={10}
                className="w-52"
            >
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <LayoutDashboardIcon />
                        Customer Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin">
                        <ShieldIcon />
                        Admin Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} variant="destructive">
                    <LogOutIcon />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}