import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface Props {
    starsCount: number;
    className?: string;
    starClassName?: string;
}

export const FeedbackStars = ({
    starsCount,
    className,
    starClassName
}: Props) => {
    return (
        <div className={cn("flex gap-1.5", className)}>
            {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                    key={index}
                    className={cn("size-4 shrink-0", index < starsCount ? "text-amber-500" : "text-muted-foreground/50", starClassName)}
                    fill="currentColor"
                />
            ))}
        </div>
    )
}