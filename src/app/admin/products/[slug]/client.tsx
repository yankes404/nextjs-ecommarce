'use client'

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";

import { EditProductCategoryModal } from "@/features/products/components/edit-product-category-modal";
import { DeleteProductCategoryModal } from "@/features/admin/components/delete-product-category-modal";
import { useEditProductCategoryModal } from "@/features/products/hooks/use-edit-product-category-modal";
import { useDeleteProductCategoryModal } from "@/features/products/hooks/use-delete-product-category-modal";
import { useProductCategoryBySlug } from "@/features/products/api/use-product-category-by-slug";
import { ProductCategorySchema } from "@/features/products/schemas";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";
import { Input } from "@/components/ui/input";
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
                    <Skeleton className="w-38 h-9" />
                    <Skeleton className="size-9" />
                    <Skeleton className="size-9" />
                </div>
            </div>
            <div className="mt-2.5 flex gap-1.5">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-10" />
            </div>
            <Skeleton
                className="h-9 w-full max-w-sm mt-6"
            />
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 mt-4">
                <Skeleton className="h-[275px]" />
                <Skeleton className="h-[275px]" />
                <Skeleton className="h-[275px]" />
                <Skeleton className="h-[275px]" />
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

export const ProductsSlugClient = ({ slug }: Props) => {
    const router = useRouter();

    const { data: productCategory, isLoading } = useProductCategoryBySlug(slug, true);

    const { open: openEditProductCategoryModal } = useEditProductCategoryModal();
    const { open: openDeleteProductCategoryModal } = useDeleteProductCategoryModal();

    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue] = useDebounce(searchValue, 500);

    const filteredProducts = useMemo(() => productCategory?.products.filter(product => product.name.toLowerCase().includes(debouncedValue.toLowerCase())) ?? [], [productCategory, debouncedValue]);

    const onEdited = (values: ProductCategorySchema) => {
        const isSlugChanged = productCategory?.slug !== values.slug;

        if (isSlugChanged) {
            router.replace(`/admin/products/${values.slug}`);
        }
    }

    const onDeleted = () => {
        router.push("/admin/products");
    }

    return isLoading ? <LoadingState /> : productCategory ? (
        <>
            <EditProductCategoryModal onSuccess={onEdited} />
            <DeleteProductCategoryModal onSuccess={onDeleted} />
            <div className="w-full flex items-center justify-between gap-3.5">
                <h1 className="text-2xl font-semibold">
                    {productCategory.name}
                </h1>
                <div className="flex gap-1.5">
                    <Button asChild>
                        <Link href={`/admin/products/${productCategory.slug}/new`}>
                            <PlusIcon />
                            Create Product
                        </Link>
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        aria-label="Edit"
                        onClick={() => openEditProductCategoryModal(productCategory)}
                    >
                        <PenIcon />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                        size="icon"
                        variant="destructive"
                        aria-label="Delete"
                        onClick={() => openDeleteProductCategoryModal(productCategory.id)}
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
                        <BreadcrumbPage>{productCategory?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Search by name..."
                className="w-full max-w-sm mt-6"
            />
            {filteredProducts.length > 0 ? (
                <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 mt-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            href={`/admin/products/${slug}/{ID}`}
                            {...product}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-sm mt-4">
                    No products found
                </p>
            )}
        </>
    ) : <NotFound />
}