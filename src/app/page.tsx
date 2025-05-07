import { type Metadata } from "next";

export const revalidate = 1800;

import { getProducts } from "@/features/products/actions";
import { ProductCard } from "@/features/products/components/product-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export const metadata: Metadata = {
  title: "Home - BuyAnything"
}

const HomePage = async () => {
  const products = await getProducts();

  return (
    <div className="min-h-svh flex flex-col">
      <Header className="bg-muted dark:bg-background" />
      <Hero />
      <main className="py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map(product => <ProductCard key={product.id} {...product} />)}
      </main>
      <Footer />
    </div>
  )
}
 
export default HomePage;