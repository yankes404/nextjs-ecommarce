'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboardIcon, LogOutIcon, ShieldIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserButton = () => {
    const { data: session } = useSession();

    return session && session.user && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="size-10 border shadow-sm">
                    <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name!}
                    />
                    <AvatarFallback className="text-sm font-medium bg-foreground/5">
                        {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
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