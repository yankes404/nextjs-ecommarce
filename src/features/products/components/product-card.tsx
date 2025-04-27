import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
    id,
    name,
    price,
    images
}: Product) => {
    return (
        <Link
            href={`/products/${id}`}
            className="p-5 rounded-xl border hover:-translate-y-1 hover:shadow-xs transition flex flex-col justify-end gap-2.5"
        >
            {images.length > 0 && (
                <Image
                    src={images[0]}
                    alt={name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover rounded-lg"
                />
            )}
            <div className="grid gap-1">
                <h3 className="font-bold text-lg">
                    {name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                    ${price.toLocaleString("en-US")}
                </p>
            </div>
        </Link>
    )
}