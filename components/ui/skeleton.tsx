import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-white/6 animate-pulse rounded-md border border-white/6", className)}
      {...props}
    />
  )
}

export { Skeleton }
