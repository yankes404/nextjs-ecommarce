'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateProductCategory } from "../api/use-create-product-category";
import { useCreateProductCategoryModal } from "../hooks/use-create-product-category-modal";
import { productCategorySchema, type ProductCategorySchema } from "../schemas";
import { SlugInput } from "@/components/ui/extensions/slug-input";

export const CreateProductCategoryModal = () => {
    const { mutate, isPending } = useCreateProductCategory();
    const { isOpen, open, close } = useCreateProductCategoryModal();

    const onOpenChange = (isOpen: boolean) => (isOpen) ? open() : close();

    const form = useForm<ProductCategorySchema>({
        resolver: zodResolver(productCategorySchema),
        defaultValues: {
            name: "",
            slug: "",
        }
    });

    const onSubmit = (values: ProductCategorySchema) => {
        mutate(values, {
            onSuccess: ({ success }) => success && close()
        });
    }

    return (
        <Dialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Create Category</DialogTitle>
                    <DialogDescription className="text-center">Complete the form below to create a new category</DialogDescription>
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
                                    <FormControl {...field}>
                                        <SlugInput
                                            placeholder="Enter unique slug..."
                                            disabled={isPending}
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
                                            placeholder="Enter name..."
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
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}