"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultsSummaryProps {
  summary: string
  matchPercentage?: number
  overallScore?: number
  recommendations?: string[]
  className?: string
}

export function ResultsSummary({
  summary,
  matchPercentage,
  overallScore,
  recommendations = [],
  className
}: ResultsSummaryProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return "bg-muted"
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreIcon = (score?: number) => {
    if (!score) return <AlertCircle className="h-4 w-4" />
    if (score >= 80) return <CheckCircle className="h-4 w-4" />
    if (score >= 60) return <TrendingUp className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall Score */}
      {(matchPercentage !== undefined || overallScore !== undefined) && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-lg">Resume Score</h3>
            {getScoreIcon(overallScore || matchPercentage)}
          </div>

          {overallScore !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-300">Overall Score</span>
                <span className="font-bold text-white">{overallScore.toFixed(1)}%</span>
              </div>
              <Progress value={overallScore} className="h-3" />
            </div>
          )}

          {matchPercentage !== undefined && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-300">Job Match</span>
                <span className="font-bold text-white">{matchPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={matchPercentage} className="h-3" />
            </div>
          )}
        </Card>
      )}

      {/* Summary */}
      <Card className="p-4">
        <h3 className="font-black text-lg mb-3">Resume Summary</h3>
        {summary ? (
          <p className="text-sm leading-relaxed text-gray-200 font-medium">
            {summary}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic font-medium">
            No summary available
          </p>
        )}
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="p-4">
          <h3 className="font-black text-lg mb-3">Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 bg-green-800/30 p-3 rounded border border-white/6">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed text-gray-200 font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}