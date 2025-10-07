"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeTabsProps {
  resumeText: string
  onResumeTextChange: (text: string) => void
  resumeFile: File | null
  onResumeFileChange: (file: File | null) => void
  jobDescription: string
  onJobDescriptionChange: (text: string) => void
  onAnalyze: () => void
  disabled?: boolean
  className?: string
}

export function ResumeTabs({
  resumeText,
  onResumeTextChange,
  resumeFile,
  onResumeFileChange,
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  disabled,
  className
}: ResumeTabsProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onResumeFileChange(file)
  }

  const handleFileRemove = () => {
    onResumeFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const canAnalyze = (resumeText.trim() || resumeFile) && !disabled

  return (
    <div className={cn("space-y-6", className)}>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/8 p-1 rounded-md">
          <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-white/8 data-[state=active]:text-white transition-all duration-200">
            <FileText className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2 data-[state=active]:bg-white/8 data-[state=active]:text-white transition-all duration-200">
            <Upload className="h-4 w-4" />
            Upload PDF
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="resume-text" className="text-sm font-bold text-white">
              Resume Text
            </Label>
            <Textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => onResumeTextChange(e.target.value)}
              placeholder="Paste your resume text here..."
              className="min-h-48 resize-y rounded-md p-3"
              disabled={disabled}
            />
            <div className="flex justify-between text-xs text-gray-300 font-medium bg-white/6 p-2 rounded border border-white/6">
              <span>{resumeText.length} characters</span>
              <span>{resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0} words</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="resume-file" className="text-sm font-bold text-white">
              Resume PDF
            </Label>
            <div className="flex items-center gap-2">
              <Input
                ref={fileInputRef}
                id="resume-file"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="flex-1 rounded-md p-2"
                disabled={disabled}
              />
              {resumeFile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFileRemove}
                  disabled={disabled}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {resumeFile && (
              <p className="text-sm text-white font-medium bg-green-800/40 p-2 rounded border border-white/6">
                Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="job-description" className="text-sm font-bold text-white">
          Job Description (Optional)
        </Label>
        <Textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description to get personalized matching insights..."
          className="min-h-32 resize-y rounded-md p-3"
          disabled={disabled}
        />
        <div className="flex justify-between text-xs text-gray-300 font-medium bg-white/6 p-2 rounded border border-white/6">
          <span>{jobDescription.length} characters</span>
          <span>{jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0} words</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="px-8 font-bold cursor-pointer"
        >
          Analyze Resume
        </Button>
      </div>
    </div>
  )
}