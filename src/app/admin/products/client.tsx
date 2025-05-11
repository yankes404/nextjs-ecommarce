'use client'

import { LoaderIcon, PlusIcon } from "lucide-react";

import { DataTable } from "@/features/admin/components/data-table";
import { productCategoryColumns } from "@/features/admin/components/product-category-columns";
import { useProductsCategories } from "@/features/products/api/use-product-categories";
import { DeleteProductCategoryModal } from "@/features/admin/components/delete-product-category-modal";
import { CreateProductCategoryModal } from "@/features/products/components/create-product-category-modal";
import { useCreateProductCategoryModal } from "@/features/products/hooks/use-create-product-category-modal";
import { EditProductCategoryModal } from "@/features/products/components/edit-product-category-modal";
import { Button } from "@/components/ui/button";

export const ProductsClient = () => {
    const { data: products, isLoading } = useProductsCategories();
    const { open: openCreateProductCategoryModal } = useCreateProductCategoryModal();

    return (
        <>
            <CreateProductCategoryModal />
            <EditProductCategoryModal />
            <DeleteProductCategoryModal />
            <h1 className="text-2xl font-semibold">
                Product Categories
            </h1>
            {isLoading ? (
                <div className="w-full flex-grow flex justify-center items-center">
                    <LoaderIcon className="size-4 shrink-0 text-muted-foreground animate-spin" />
                </div>
            ): (
                <DataTable
                    data={products ?? []}
                    columns={productCategoryColumns}
                    searchInput={{ accessorKey: "name", placeholder: "Search by name..." }}
                    buttons={(
                        <Button onClick={openCreateProductCategoryModal}>
                            <PlusIcon />
                            Create new
                        </Button>
                    )}
                />
            )}
        </>
    )
}