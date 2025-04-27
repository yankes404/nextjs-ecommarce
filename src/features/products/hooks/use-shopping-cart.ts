'use client'

import { useEffect } from "react";
import { create } from "zustand";
import { toast } from "sonner";
import { Product } from "@prisma/client";

import { getProductsByIds } from "../actions";

interface ShoppingCartStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

const useShoppingCartStore = create<ShoppingCartStore>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
}));

export const useShoppingCart = () => {
    const { products, setProducts } = useShoppingCartStore();

    const addProduct = (product: Product) => {
        const newProducts = [...products, product];
        setProducts(newProducts);
        localStorage.setItem("products", JSON.stringify(newProducts.map((product) => product.id)));

        toast.success(`${product.name} added to cart`);
    }

    const removeProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts.map((product) => product.id)));

        toast.success(`${products[index].name} removed from cart`);
    }

    useEffect(() => {
        try {
            let storedProductsIds = JSON.parse(localStorage.getItem("products") || "[]");
            if (!Array.isArray(storedProductsIds)) {
                storedProductsIds = [];
            }

            const productsIds: string[] = storedProductsIds.filter((id: unknown) => typeof id === "string").map((id: string) => id as string);

            if (productsIds.length > 0) {
                getProductsByIds(productsIds).then((products) => {
                    const countedProducts = products.map((p) => {
                        const count = storedProductsIds.filter((id: string) => id === p.id).length;
                        return { ...p, count };
                    });

                    const muliplicatedProducts = countedProducts.reduce((acc, p) => [...acc, ...Array(p.count).fill(p)], [] as Product[]);

                    setProducts(muliplicatedProducts);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, [setProducts]);

    return {
        products,
        addProduct,
        removeProduct
    };
};