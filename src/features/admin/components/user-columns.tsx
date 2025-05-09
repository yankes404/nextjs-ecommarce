'use client'

import { ColumnDef, Row } from "@tanstack/react-table";
import type { User } from "@prisma/client";
import { ArrowUpDownIcon, MoreHorizontalIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { UserImage } from "@/features/auth/components/user-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { UserRoleBadge } from "./user-role-badge";
import { useMakeUserAdminModal } from "../hooks/use-make-user-admin-modal";

function ActionsCell (row: Row<Omit<User, "password">>) {
    {
        const user = row.original;
        const { open: openMakeUserAdminModal } = useMakeUserAdminModal();

        const copyIdToClipboard = () => {
            try {
                navigator.clipboard.writeText(user.id);
                toast.success("User ID copied to clipboard");
            } catch (error) {
                console.error(error);
                toast.error("Failed to copy user ID");
            }
        }

        const onMakeUserAdmin = () => {
            openMakeUserAdminModal(user.id);
        }
 
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={copyIdToClipboard}
                    >
                        Copy user ID
                    </DropdownMenuItem>
                    {/* TODO: <DropdownMenuItem>Send Email</DropdownMenuItem> */}
                    {user.role !== "ADMIN" && (
                        <DropdownMenuItem onClick={onMakeUserAdmin}>
                            Change Role to Admin
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const userColumns : ColumnDef<Omit<User, "password">>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="px-4 flex items-center gap-1.5">
                <span className="lowercase">
                    {row.getValue("email")}
                </span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Badge
                                variant={row.original.emailVerified ? "success" : "secondary"}
                            >
                                {row.original.emailVerified ? "Verified" : "Unverified"}
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original.emailVerified ? `Verified at ${format(row.original.emailVerified, "PPP p")}` : "Email is not verified"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="px-4 flex items-center gap-1.5">
                <UserImage
                    image={row.original.image}
                    name={row.original.name}
                    className="size-5"
                    fallbackClassName="text-[10px] leading-[0px]"
                />
                <span>{row.getValue("name")}</span>
            </div>
        )
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <UserRoleBadge role={row.original.role} />
    },
    {
        accessorKey: "twoFAEnabled",
        header: "2FA",
        cell: ({ row }) => (
            <Badge
                variant={row.original.twoFAEnabled ? "success" : "destructive"}
            >
                {row.original.twoFAEnabled ? "Enabled" : "Disabled"}
            </Badge>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Badge className="px-4" variant="secondary">
                {format(row.original.createdAt, "PPP")}
            </Badge>
        )
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated At
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Badge className="px-4" variant="secondary">
                {format(row.original.updatedAt, "PPP")}
            </Badge>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell {...row} />
    }
]