'use client'

import { ProductCategory } from "@prisma/client";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useForm } from "react-hook-form";
import { productSchema, ProductSchema } from "@/features/products/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "@/features/products/api/use-create-product";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SlugInput } from "@/components/ui/extensions/slug-input";
import { Button } from "@/components/ui/button";
import { isNumber } from "@/lib/utils";
import { DollarSignIcon } from "lucide-react";

interface Props {
    category: ProductCategory;
}

export const NewProductClient = ({ category }: Props) => {
    const { mutate, isPending } = useCreateProduct();

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            stripeId: "",
            price: "" as unknown as number,
            description: "",
            categoryId: category.id,
        }
    });

    const onSubmit = async (values: ProductSchema) => {
        mutate(values);
    }

    return (
        <>
            <h1 className="text-2xl font-semibold">
                Create New Product
            </h1>
            <Breadcrumb className="mt-2.5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/products">Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/admin/products/${category.slug}`}>{category.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>New</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mt-6 w-full max-w-xl"
                >
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
                                        placeholder="Enter a product name..."
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        placeholder="Enter a slug..."
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stripeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Stripe ID
                                </FormLabel>
                                <FormControl {...field}>
                                    <Input
                                        placeholder="Enter a Stripe ID..."
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <div className="relative w-full">
                                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 shrink-0"/>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            min={1}
                                            max={Number.MAX_SAFE_INTEGER}
                                            disabled={isPending}
                                            {...field}
                                            className="ps-10"
                                            onChange={(e) => field.onChange(isNumber(e.currentTarget.valueAsNumber) ? e.currentTarget.valueAsNumber : "")}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl {...field}>
                                    <Textarea
                                        placeholder="Enter a description..."
                                        disabled={isPending}
                                        className="h-20 min-h-16 max-h-28"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="mt-2"
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </>
    )
}