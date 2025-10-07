import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white/6 text-white",
        secondary: "bg-white/4 text-white",
        destructive: "bg-red-600 text-white",
        outline: "border border-white/10 bg-transparent text-white",
        success: "bg-emerald-600 text-white",
        info: "bg-sky-600 text-white",
        purple: "bg-[#6b4bff] text-white",
        pink: "bg-[#ff9ffc] text-white",
        warning: "bg-amber-500 text-white",
        muted: "bg-white/5 text-gray-300 border border-white/6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
