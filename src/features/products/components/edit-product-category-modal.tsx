'use client'

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { productCategorySchema, type ProductCategorySchema } from "../schemas";
import { useEditProductCategoryModal } from "../hooks/use-edit-product-category-modal";
import { useEditProductCategory } from "../api/use-edit-product-category";

interface Props {
    onSuccess?: (values: ProductCategorySchema) => void;
}

export const EditProductCategoryModal = ({ onSuccess }: Props) => {
    const { isOpen, productCategory, open, close } = useEditProductCategoryModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && productCategory) ? open(productCategory) : close();

    const { mutate, isPending } = useEditProductCategory();

    const form = useForm<ProductCategorySchema>({
        resolver: zodResolver(productCategorySchema),
        defaultValues: {
            name: "",
            slug: ""
        }
    });

    const onSlugChange = (value: string) => {
        form.setValue("slug", value.replaceAll(" ", "-").toLowerCase());
    }

    const onSubmit = (values: ProductCategorySchema) => {
        if (!productCategory) {
            toast.error("Category not found");
            return;
        }

        mutate({
            productCategoryId: productCategory.id,
            values
        }, {
            onSuccess: ({ success }) => {
                if (success) {
                    onSuccess?.(values);
                    form.reset();
                    close();
                }
            }
        })
    }

    useEffect(() => {
        if (isOpen) {
            if (productCategory) {
                form.setValue("name", productCategory.name);
                form.setValue("slug", productCategory.slug);
            }
        } else {
            form.reset();
        }
    }, [isOpen, productCategory, form]);

    return (
        <Dialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        Edit Product Category
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Edit your product category
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Slug
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter category slug here..."
                                            className="h-10 min-h-8 max-h-12"
                                            disabled={isPending}
                                            {...field}
                                            onChange={(e) => onSlugChange(e.currentTarget.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl {...field}>
                                        <Input
                                            placeholder="Enter category name here..."
                                            className="h-10 min-h-8 max-h-12"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="mt-2"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
