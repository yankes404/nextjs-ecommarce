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

import { useDeleteProductModal } from "../hooks/use-delete-product-modal";
import { useDeleteProduct } from "../api/use-delete-product";

interface Props {
    onSuccess?: () => void;
}

export const DeleteProductModal = ({ onSuccess }: Props) => {
    const { mutate, isPending } = useDeleteProduct();

    const { isOpen, open, close, productId } = useDeleteProductModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && productId) ? open(productId) : (!isPending && close());

    const deleteProduct = () => productId && mutate(productId, { onSuccess: ({ success }) => success && onSuccess?.() });

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
                        This action cannot be undone. This will permanently delete this product from our database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteProduct}
                        disabled={isPending}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
