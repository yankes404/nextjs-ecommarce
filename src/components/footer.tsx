import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="w-screen p-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex justify-between items-center gap-3.5 bg-muted text-xs mt-auto flex-wrap dark:bg-background dark:border-t">
            <span>
                &copy; BuyAnything {new Date().getFullYear()}. All rights reserved
            </span>
            <span className="text-end">
                Created by <Link href="https://github.com/yankes404" className="font-medium transition hover:opacity-80">yankes404</Link>
            </span>
        </footer>
    )
}