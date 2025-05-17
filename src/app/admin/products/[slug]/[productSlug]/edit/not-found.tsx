import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="w-full h-svh flex flex-col items-center justify-center gap-2.5">
            <h1 className="text-xl font-bold">
                Product Category not found
            </h1>
            <Button
                size="lg"
                asChild
            >
                <Link href="/admin/products">
                    Browse Categories
                </Link>
            </Button>
        </div>
    )
}

export default NotFound;