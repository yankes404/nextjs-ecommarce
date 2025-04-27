'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
    images: string[];
}

export const ProductImages = ({ images }: Props) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="grid gap-4">
            <Image
                src={images[currentImageIndex]}
                alt={""}
                width={2040}
                height={2040}
                className="w-full aspect-square object-cover object-center rounded-2xl border"
            />
            {images.length > 1 && (
                <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className="rounded-lg"
                        >
                            <Image
                                src={image}
                                alt=""
                                width={128}
                                height={128}
                                className={cn("w-full aspect-square object-cover object-center rounded-lg border cursor-pointer hover:opacity-80 transition", currentImageIndex === index && "ring-2")}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}