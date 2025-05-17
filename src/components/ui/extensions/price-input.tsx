'use client'

import { useState } from "react";
import { DollarSignIcon } from "lucide-react";

import { cn, isNumber } from "@/lib/utils";

import { Input } from "../input";

type Props = React.ComponentProps<typeof Input> & {
    value?: number;
    onValueChange?: (value: number) => void;
}

function PriceInput ({
    value = 0,
    onValueChange,
    className,
    min = 1,
    max = Number.MAX_SAFE_INTEGER,
    ...props
}: Props) {
    const [isFocus, setIsFocus] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber;

        if (isNumber(value) && isNumber(min as number) && isNumber(max as number)) {
            // @ts-expect-error Type 'string' is not assignable to type 'number'.
            if (value < min) return;
            // @ts-expect-error Type 'string' is not assignable to type 'number'.
            if (value > max) return;
        }
        
        onValueChange?.(isNumber(value) ? value : 0);
    }

    return (
        <div className="relative w-full">
            <DollarSignIcon className="size-4 shrink-0 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
                type={isFocus ? "number" : "text"}
                value={isFocus ? value : value.toLocaleString("en-US")}
                onChange={handleChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className={cn("ps-8", className)}
                min={min}
                max={max}
                {...props}
            />
        </div>
    )
}

export { PriceInput }