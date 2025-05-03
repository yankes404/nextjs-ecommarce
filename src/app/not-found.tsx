import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="min-h-svh flex flex-col">
          <Header />
          <main className="py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center">
                404
            </h1>
            <h2 className="text-sm text-center mt-1">
                Page couldn&apos;t be found
            </h2>
            <Button className="w-full md:w-auto mt-6" size="lg" asChild>
                <Link href="/">
                    <HomeIcon />
                    Home
                </Link>
            </Button>
          </main>
          <Footer />
        </div>
    )
}
 
export default NotFoundPage;