'use client'

import Link from "next/link";
import { ColumnDef, Row } from "@tanstack/react-table";
import type { ProductCategory } from "@prisma/client";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowUpDownIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useEditProductCategoryModal } from "@/features/products/hooks/use-edit-product-category-modal";

import { useDeleteProductCategoryModal } from "../../products/hooks/use-delete-product-category-modal";

function ActionsCell (row: Row<ProductCategory>) {
    {
        const category = row.original;
        
        const { open: openEditProductCategoryModal } = useEditProductCategoryModal();
        const { open: openDeleteProductCategoryModal } = useDeleteProductCategoryModal();

        const copyIdToClipboard = () => {
            try {
                navigator.clipboard.writeText(category.id);
                toast.success("Category ID copied to clipboard");
            } catch (error) {
                console.error(error);
                toast.error("Failed to copy category ID");
            }
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
                        Copy category ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => openEditProductCategoryModal(category)}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => openDeleteProductCategoryModal(category.id)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const productCategoryColumns : ColumnDef<ProductCategory>[] = [
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
            <Button
                variant="ghost"
                asChild
            >
                <Link href={`/admin/products/${row.original.slug}`}>
                    {row.getValue("name")}
                </Link>
            </Button>
        )
    },
    {
        accessorKey: "slug",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Slug
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Badge
                variant="outline"
            >
                {row.getValue("slug")}
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