'use client'

import { useState } from "react";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
    stars: number;
    disabled?: boolean;
    onStarsChange: (stars: number) => void;
}

export const FeedbackStarsPicker = ({
    stars,
    disabled,
    onStarsChange
}: Props) => {
    const [hoveredStars, setHoveredStars] = useState(0);

    return (
        <div
            className="flex items-center gap-1.5"
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <button
                    type="button"
                    key={index}
                    disabled={disabled}
                    className="disabled:pointer-events-none disabled:opacity-50"
                >
                    <StarIcon
                        className={cn("size-5 shrink-0", index < hoveredStars || index < stars ? (hoveredStars < stars && index >= hoveredStars && hoveredStars > 0) ? "text-amber-500/50" : "text-amber-500" : "text-muted-foreground/50")}
                        fill="currentColor"
                        onMouseEnter={() => setHoveredStars(index + 1)}
                        onMouseLeave={() => setHoveredStars(0)}
                        onClick={() => onStarsChange(index + 1)}
                    />
                </button>
            ))}
        </div>
    )
}