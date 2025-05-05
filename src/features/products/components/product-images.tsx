'use client'

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useImagesLightbox } from "@/hooks/use-images-lightbox";
import { ImagesLightbox } from "@/components/images-lightbox";

interface Props {
    images: string[];
}

export const ProductImages = ({ images }: Props) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { open } = useImagesLightbox();

    const handleOpen = () => open(images);

    return images.length > 0 && (
        <div className="grid gap-4">
            <ImagesLightbox />
            <button className="rounded-2xl cursor-pointer" onClick={handleOpen}>
                <Image
                    src={images[currentImageIndex]}
                    alt={""}
                    width={2040}
                    height={2040}
                    className="w-full aspect-square object-cover object-center rounded-2xl border"
                />
            </button>
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