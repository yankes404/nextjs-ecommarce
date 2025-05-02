import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const hintVariant = cva(
  "w-full text-sm py-2.5 px-3 rounded-lg shadow-sm border",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/15",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Hint ({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof hintVariant>) {

  return (
    <div
      data-slot="hint"
      className={cn(hintVariant({ variant, className }))}
      {...props}
    />
  )
}

export { Hint, hintVariant }
