"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillsListProps {
  skills: string[]
  matchedSkills?: string[]
  missingSkills?: string[]
  className?: string
  showDetected?: boolean
  showMatchedAndMissing?: boolean
}

export function SkillsList({
  skills,
  matchedSkills = [],
  missingSkills = [],
  className
  , showDetected = false, showMatchedAndMissing = true
}: SkillsListProps) {
  const getSkillBadge = (skill: string, type: 'detected' | 'matched' | 'missing') => {
    const baseClasses = "rounded-md px-3 py-2 font-semibold text-sm"

    switch (type) {
      case 'matched':
        return (
          <Badge variant="success" className={cn(baseClasses)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            {skill}
          </Badge>
        )
      case 'missing':
        return (
          <Badge variant="destructive" className={cn(baseClasses)}>
            <XCircle className="h-4 w-4 mr-2" />
            {skill}
          </Badge>
        )
      default:
        return (
          <Badge variant="muted" className={cn(baseClasses)}>
            <Star className="h-4 w-4 mr-2" />
            {skill}
          </Badge>
        )
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showDetected && (
        <Card className="p-4">
          <h3 className="font-black text-lg mb-3">Detected Skills</h3>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <React.Fragment key={index}>{getSkillBadge(skill, 'detected')}</React.Fragment>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 italic font-medium">No skills detected in your resume</p>
          )}
        </Card>
      )}

      {showMatchedAndMissing && matchedSkills.length > 0 && (
        <Card className="p-4">
          <h3 className="font-black text-lg mb-3">Job-Matched Skills</h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <React.Fragment key={index}>{getSkillBadge(skill, 'matched')}</React.Fragment>
            ))}
          </div>
        </Card>
      )}

      {showMatchedAndMissing && missingSkills.length > 0 && (
        <Card className="p-4">
          <h3 className="font-black text-lg mb-3">Missing Skills</h3>
          <p className="text-sm text-gray-300 mb-3 font-medium">
            Skills mentioned in the job description but not found in your resume
          </p>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <React.Fragment key={index}>{getSkillBadge(skill, 'missing')}</React.Fragment>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}