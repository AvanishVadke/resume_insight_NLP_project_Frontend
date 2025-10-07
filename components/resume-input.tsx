"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ResumeInputProps = {
  value: string
  onChange: (text: string) => void
  onAnalyze: () => void
  onMatch: () => void
  disabled?: boolean
  className?: string
}

export function ResumeInput({ value, onChange, onAnalyze, onMatch, disabled, className }: ResumeInputProps) {
  const chars = value.length
  const words = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <label className="text-sm font-medium text-muted-foreground" htmlFor="resume-input">
        Paste your resume text below
      </label>
      <Textarea
        id="resume-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your resume here..."
        className="min-h-48 resize-y"
        aria-label="Resume text"
        disabled={disabled}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="sr-only">Character count</span>
          {chars} chars • {words} words
        </p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onMatch} disabled={disabled || !value.trim()} aria-label="Match skills">
            Match Skills
          </Button>
          <Button onClick={onAnalyze} disabled={disabled || !value.trim()} aria-label="Analyze resume">
            Analyze Resume
          </Button>
        </div>
      </div>
    </div>
  )
}
