import { type Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export const metadata: Metadata = {
  title: "Home - BuyAnything"
}

const HomePage = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header className="bg-muted" />
      <Hero />
      <main className="p-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48">
        Main Content
      </main>
      <Footer />
    </div>
  )
}
 
export default HomePage;