'use client'

import { useCallback } from "react";
import { create } from "zustand";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

import { getProductById } from "../actions";

function getStoredProductIds(): ProductId[] {
    try {
        let storedProductsIds = JSON.parse(localStorage.getItem("products") || "[]");

        if (!Array.isArray(storedProductsIds)) {
            storedProductsIds = [];
        }

        return storedProductsIds.filter((obj: unknown) => {
            return obj && typeof obj === "object" && "id" in obj && typeof obj.id === "string" && "count" in obj && typeof obj.count === "number";
        }) as ProductId[];
    } catch {
        return [];
    }
}

interface ProductId {
    id: string;
    count: number;
}

interface Store {
    productIds: ProductId[];
    setProductIds: (productIds: ProductId[]) => void;
}

const store = create<Store>((set) => ({
    productIds: getStoredProductIds(),
    setProductIds: (productIds) => set({ productIds }),
}));

const STALE_TIME = 30 * 60 * 1000;
const CACHE_TIME = 35 * 60 * 1000;

export const useShoppingCart = () => {
    const { productIds, setProductIds } = store();

    const addProduct = useCallback((productId: string) => {
        let newProducts = [...productIds];

        const existingProduct = productIds.find((p) => p.id === productId);

        if (existingProduct) {
            if (existingProduct.count > 99) {
                toast.error("You can't add more than 99 products");
                return;
            }

            newProducts = productIds.map((p) => {
                if (p.id === productId) {
                    return { ...p, count: p.count + 1 };
                } else {
                    return p;
                }
            });
        } else {
            newProducts.push({ id: productId, count: 1 });
        }
        
        localStorage.setItem("products", JSON.stringify(newProducts));
        toast.success("Product added to cart");

        setProductIds(newProducts);
    }, [productIds, setProductIds]);

    const removeProduct = useCallback((id: string) => {
        const newProducts = productIds.filter((p) => p.id !== id);

        localStorage.setItem("products", JSON.stringify(newProducts));
        toast.success("Product removed from cart");

        setProductIds(newProducts);
    }, [productIds, setProductIds]);

    const changeProductCount = useCallback((id: string, count: number) => {
        const newProducts = productIds.map((p) => {
            if (p.id === id) {
                return { ...p, count };
            } else {
                return p;
            }
        });

        localStorage.setItem("products", JSON.stringify(newProducts));
        toast.success("Product count changed");

        setProductIds(newProducts);
    }, [productIds, setProductIds]);

    const productQueries = useQueries({
        queries: productIds.map((obj) => ({
            queryKey: ["product", obj.id],
            queryFn: () => getProductById(obj.id),
            staleTime: STALE_TIME,
            cacheTime: CACHE_TIME,
        })),
    }) as UseQueryResult<Product>[];

    const isLoading = productQueries.some((q) => q.isLoading) ?? false;
    const products = productQueries
        .filter((q) => q.status === "success" && q.data)
        .map((q) => ({
            ...q.data!,
            count: productIds.find((p) => p.id === q.data!.id)!.count
        }) as Product & { count: number });

    return {
        products,
        isLoading,
        addProduct,
        removeProduct,
        changeProductCount
    };
}
