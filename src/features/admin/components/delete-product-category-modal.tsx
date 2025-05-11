'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useDeleteProductCategoryModal } from "../../products/hooks/use-delete-product-category-modal";
import { useDeleteProductCategory } from "@/features/products/api/use-delete-product-category";

export const DeleteProductCategoryModal = () => {
    const { mutate, isPending } = useDeleteProductCategory();

    const { isOpen, open, close, productCategoryId } = useDeleteProductCategoryModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && productCategoryId) ? open(productCategoryId) : (!isPending && close());

    const deleteProductCategory = () => productCategoryId && mutate({ productCategoryId });

    return (
        <AlertDialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product category.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteProductCategory}
                        disabled={isPending}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
