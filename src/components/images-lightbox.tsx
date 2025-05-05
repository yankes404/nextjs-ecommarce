import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

import { useImagesLightbox } from "@/hooks/use-images-lightbox";

import { Button } from "./ui/button";

export const ImagesLightbox = () => {
    const { isOpen, images, close } = useImagesLightbox();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentImage = useMemo(() => images[currentImageIndex], [currentImageIndex, images]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
    }, [images]);

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
    }, [images]);

    useEffect(() => {
        document.body.classList[isOpen ? "add" : "remove"]("overflow-hidden");
    }, [isOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                prevImage();
            }

            if (e.key === "ArrowRight") {
                nextImage();
            }

            if (e.key === "Escape") {
                close();
            }
        }

        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
            return () => window.removeEventListener("keydown", onKeyDown);
        }
    }, [currentImageIndex, images, isOpen, close, prevImage, nextImage]);

    return isOpen && images.length > 0 && (
        <>
            <div className="fixed inset-0 z-40 bg-black/80" onClick={close} />
            <Image
                src={currentImage}
                alt=""
                width={2040}
                height={2040}
                className="fixed z-50 top-1/2 left-1/2 -translate-1/2 max-h-[90vh] w-auto max-w-[90vw] object-center rounded-xl shadow-md"
            />
            {images.length > 1 && (
                <Button
                    size="icon"
                    className="fixed z-[60] top-1/2 -translate-y-1/2 left-4 size-12 rounded-xl"
                    onClick={prevImage}
                >
                    <ChevronLeft className="size-6" />
                </Button>
            )}
            {images.length > 1 && (
                <Button
                    size="icon"
                    className="fixed z-[60] top-1/2 -translate-y-1/2 right-4 size-12 rounded-xl"
                    onClick={nextImage}
                >
                    <ChevronRight className="size-6" />
                </Button>
            )}
            <button
                className="fixed z-[60] top-9 right-9 text-white hover:text-white/80 transition rounded-xl cursor-pointer outline-none"
                onClick={close}
            >
                <XIcon className="size-4" />
            </button>
        </>
    )
}