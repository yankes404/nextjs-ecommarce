import Image from "next/image";
import Link from "next/link";
import { type Product } from "@prisma/client";

type Props = Product & {
    href?: string;
}

const getHref = (href: string, id: string, slug: string) => href.replaceAll("{ID}", id).replaceAll("{SLUG}", slug);

export const ProductCard = ({
    id,
    name,
    slug,
    price,
    images,
    href = "/products/{ID}"
}: Props) => {
    return (
        <Link
            href={getHref(href, id, slug)}
            className="p-5 rounded-xl border hover:-translate-y-1 hover:shadow-xs transition flex flex-col justify-end gap-2.5"
        >
            {images.length > 0 && (
                <Image
                    src={images[0]}
                    alt={name}
                    width={512}
                    height={512}
                    className="w-full aspect-square object-cover object-center"
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