import { useState } from 'react'

export interface Token {
  lemma: string
  pos: string
}

export interface Entity {
  text: string
  label: string
}

export interface MatchResult {
  index: number
  category: string
  similarity: number
  resume_text: string
}

export interface AnalysisResult {
  tokens: Token[]
  named_entities: Entity[]
  detected_skills: string[]
  summary: string
}

export interface MatchResponse {
  top_similar_resumes: MatchResult[]
  similarity_scores: number[]
  missing_skills: string[]
}

export interface EnhancedAnalysisResult {
  resume_summary: string
  skills: string[]
  entities: Record<string, string[]>
  matched_skills?: string[]
  missing_skills?: string[]
  match_percentage?: number
  overall_score?: number
  recommendations?: string[]
}

export function useResumeAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeResume = async (resume: string): Promise<AnalysisResult | null> => {
    if (!resume.trim()) {
      setError('Resume text cannot be empty')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AnalysisResult = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  const matchResume = async (resume: string): Promise<MatchResponse | null> => {
    if (!resume.trim()) {
      setError('Resume text cannot be empty')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MatchResponse = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  const analyzeResumeEnhanced = async (
    resumeText?: string,
    resumeFile?: File,
    jobDescription?: string
  ): Promise<EnhancedAnalysisResult | null> => {
    if (!resumeText && !resumeFile) {
      setError('Either resume text or PDF file must be provided')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()

      if (resumeFile) {
        formData.append('resume_file', resumeFile)
      } else if (resumeText) {
        formData.append('resume_text', resumeText)
      }

      if (jobDescription) {
        formData.append('job_description_text', jobDescription)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze_resume`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: EnhancedAnalysisResult = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    analyzeResume,
    matchResume,
    analyzeResumeEnhanced,
  }
}