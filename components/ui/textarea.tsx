import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-400 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 bg-black/70 flex field-sizing-content min-h-16 w-full rounded-md border border-white/6 px-3 py-2 text-white transition-colors outline-none focus:ring-2 focus:ring-white/10",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
