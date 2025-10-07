"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function LoaderSkeleton() {
  return (
    <div aria-live="polite" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3 rounded" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
      <div className="space-y-3">
  <Skeleton className="h-5 w-1/4 rounded" />
  <Skeleton className="h-24 w-full rounded-md" />
      </div>
      <div className="space-y-3">
  <Skeleton className="h-5 w-1/3 rounded" />
  <Skeleton className="h-40 w-full rounded-md" />
      </div>
      <div className="space-y-3">
  <Skeleton className="h-5 w-1/4 rounded" />
  <Skeleton className="h-40 w-full rounded-md" />
      </div>
      <div className="md:col-span-2 space-y-3">
  <Skeleton className="h-5 w-1/5 rounded" />
  <Skeleton className="h-56 w-full rounded-md" />
      </div>
    </div>
  )
}
