import { Metadata } from "next";

import { ProductsClient } from "./client";

export const metadata: Metadata = {
    title: "Products - BuyAnything"
}

const ProductsPage = () => {
    return <ProductsClient />
}
 
export default ProductsPage;