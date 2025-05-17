'use client'

import Link from "next/link";
import { PenIcon, TrashIcon } from "lucide-react";

import { useProductBySlug } from "@/features/products/api/use-product-by-slug";
import { DeleteProductModal } from "@/features/products/components/delete-product-modal";
import { useDeleteProductModal } from "@/features/products/hooks/use-delete-product-modal";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    slug: string;
}

const LoadingState = () => {
    return (
        <>
            <div className="w-full flex items-center justify-between gap-3.5">
                <Skeleton className="h-9 w-20" />
                <div className="flex gap-1.5">
                    <Skeleton className="size-9" />
                    <Skeleton className="size-9" />
                </div>
            </div>
            <div className="mt-2.5 flex gap-1.5">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-5 w-14" />
            </div>
        </>
    )
}

const NotFound = () => {
    return (
        <div className="w-full h-svh flex flex-col items-center justify-center gap-2.5">
            <h1 className="text-xl font-bold">
                Product not found
            </h1>
            <Button
                size="lg"
                asChild
            >
                <Link href="/admin/products">
                    Browse Categories
                </Link>
            </Button>
        </div>
    )
}

export const ProductSlugClient = ({ slug }: Props) => {
    const { data: product, isLoading } = useProductBySlug(slug);

    const { open: openDeleteProductModal } = useDeleteProductModal();

    return isLoading ? <LoadingState /> : product ? (
        <>
            <DeleteProductModal />
            <div className="w-full flex items-center justify-between gap-3.5">
                <h1 className="text-2xl font-semibold">
                    {product.name}
                </h1>
                <div className="flex gap-1.5">
                    <Button
                        size="icon"
                        variant="outline"
                        aria-label="Edit"
                        asChild
                    >
                        <Link href={`/admin/products/${product.category.slug}/${product.slug}/edit`}>
                            <PenIcon />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        size="icon"
                        variant="destructive"
                        aria-label="Delete"
                        onClick={() => openDeleteProductModal(product.id)}
                    >
                        <TrashIcon />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </div>
            <Breadcrumb className="mt-2.5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/products">Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/admin/products/${product.category.slug}`}>{product.category.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8 text-3xl font-bold uppercase text-red-500">
                TODO: SHOW SALES CHARTS AND STATS
            </div>
        </>
    ) : <NotFound />
}