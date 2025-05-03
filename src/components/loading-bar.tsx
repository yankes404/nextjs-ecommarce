'use client'

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const LoadingBar = () => {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        
        const fullUrl = `${pathname}?${searchParams.toString()}`;
        let client: XMLHttpRequest | null = null;

        if (ref.current) {
            ref.current.classList.add("opacity-100");
            ref.current.classList.remove("opacity-0");

            client = new XMLHttpRequest();
            client.open("GET", fullUrl);
            client.onprogress = (pe) => {
                if (pe.lengthComputable && ref.current) {
                  ref.current.style.setProperty("--progress", `${(pe.loaded / pe.total) * 100}%`);
                }
            }

            client.onloadend = () => {
                if (ref.current) {
                    ref.current.style.setProperty("--progress", "100%");

                    setTimeout(() => {
                        ref.current?.classList.add("opacity-0"); 
                        ref.current?.classList.remove("opacity-100"); 
                    }, 350)
                }
            }

            client.send();
        }

        return () => {
            if (client) {
                client.abort();
                client = null;
            }
        }
    }, [ref, pathname, searchParams]);

    return (
        <div
            ref={ref}
            className="fixed h-0.5 w-screen top-0 left-0 z-[99] transition duration-300"
            style={{ "--progress": "0%" } as React.CSSProperties}
        >
            <div
                className="h-full bg-foreground transition-[width] duration-300 ease-out"
                style={{ width: "var(--progress)" }}
            />
        </div>
    )
}