import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 selection:bg-white/10 selection:text-white h-9 w-full min-w-0 rounded-md border bg-black/70 px-3 py-1 text-white transition-colors outline-none",
        "focus:ring-2 focus:ring-white/10 focus:border-white/20",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
