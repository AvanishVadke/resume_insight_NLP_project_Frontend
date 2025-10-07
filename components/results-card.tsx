"use client"

import type * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ResultsCardProps = {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ResultsCard({ title, description, children, className }: ResultsCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-balance">{title}</CardTitle>
        {description ? <CardDescription className="text-pretty">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}
