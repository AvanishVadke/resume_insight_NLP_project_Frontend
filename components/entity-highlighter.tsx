"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Entity {
  text: string
  label: string
}

interface EntityHighlighterProps {
  entities: Record<string, string[]>
  className?: string
}

export function EntityHighlighter({ entities, className }: EntityHighlighterProps) {
  const getEntityColor = (label: string) => {
    switch (label.toUpperCase()) {
      case 'PERSON':
        return 'bg-blue-600 text-white'
      case 'ORG':
      case 'ORGANIZATION':
        return 'bg-green-600 text-white'
      case 'LOC':
      case 'LOCATION':
      case 'GPE':
        return 'bg-purple-600 text-white'
      case 'SKILL':
        return 'bg-orange-500 text-white'
      case 'DATE':
        return 'bg-yellow-500 text-white'
      case 'MONEY':
        return 'bg-pink-500 text-white'
      default:
        return 'bg-white/6 text-white'
    }
  }

  const getEntityIcon = (label: string) => {
    switch (label.toUpperCase()) {
      case 'PERSON':
        return '👤'
      case 'ORG':
      case 'ORGANIZATION':
        return '🏢'
      case 'LOC':
      case 'LOCATION':
      case 'GPE':
        return '📍'
      case 'SKILL':
        return '🛠️'
      case 'DATE':
        return '📅'
      case 'MONEY':
        return '💰'
      default:
        return '🏷️'
    }
  }

  const entityEntries = Object.entries(entities)

  if (entityEntries.length === 0) {
    return (
      <Card className={cn("p-4", className)}>
        <h3 className="font-black text-lg mb-3">Named Entities</h3>
        <p className="text-sm text-gray-400 italic font-medium">
          No entities detected in your resume
        </p>
      </Card>
    )
  }

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="font-black text-lg mb-3">Named Entities</h3>
      <div className="space-y-4">
        {entityEntries.map(([label, texts]) => (
          <div key={label} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getEntityIcon(label)}</span>
              <h4 className="font-bold text-sm uppercase tracking-wide text-white">
                {label}
              </h4>
              <Badge variant="info" className="text-xs font-bold">
                {texts.length}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {texts.map((text, index) => (
                <Badge
                  key={index}
                  className={cn("rounded-md px-3 py-2 font-semibold text-sm", getEntityColor(label))}
                >
                  {text}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}