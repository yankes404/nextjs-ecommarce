'use client';

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const LoadingBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (
        !link ||
        link.target === '_blank' ||
        link.hasAttribute('download') ||
        link.getAttribute('rel') === 'external' ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:')
      ) {
        return;
      }

      const isInternal = link.href.startsWith(window.location.origin);
      if (isInternal && ref.current) {
        ref.current.classList.add("opacity-100");
        ref.current.classList.remove("opacity-0");
        ref.current.style.setProperty('--progress', '20%');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--progress", "80%");
      setTimeout(() => {
        ref.current!.style.setProperty("--progress", "100%");
        setTimeout(() => {
          ref.current?.classList.add("opacity-0");
          ref.current?.classList.remove("opacity-100");
          ref.current!.style.setProperty("--progress", "0%");
        }, 300);
      }, 200);
    }
  }, [pathname]);

  return (
    <div
      id="loading-bar"
      ref={ref}
      className="fixed h-0.5 w-screen top-0 left-0 z-[99] opacity-0 transition-opacity duration-300 pointer-events-none"
      style={{ "--progress": "0%" } as React.CSSProperties}
    >
      <div
        className="h-full bg-foreground transition-[width] duration-300 ease-out"
        style={{ width: "var(--progress)" }}
      />
    </div>
  );
}