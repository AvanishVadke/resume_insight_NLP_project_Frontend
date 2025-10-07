"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import LiquidEther from "@/components/LiquidEther";
import { ResumeTabs } from "@/components/resume-tabs";
import { ResultsSummary } from "@/components/results-summary";
import { SkillsList } from "@/components/skills-list";
import { EntityHighlighter } from "@/components/entity-highlighter";
import { MatchChart } from "@/components/match-chart";
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { LoaderSkeleton } from "@/components/loader";
import { cn } from "@/lib/utils";
import {
  useResumeAnalysis,
  type EnhancedAnalysisResult,
} from "@/lib/useResumeAnalysis";

function Page() {
  const [resumeText, setResumeText] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [detailsVisible, setDetailsVisible] = useState<{
    detected: boolean
    entities: boolean
  }>({ detected: false, entities: false })

  // Analysis results
  const [analysisResult, setAnalysisResult] =
    React.useState<EnhancedAnalysisResult | null>(null);

  const { loading, error, analyzeResumeEnhanced } = useResumeAnalysis();

  const handleAnalyze = async () => {
    if (!resumeText.trim() && !resumeFile) return;

    setShowResults(false);
    const result = await analyzeResumeEnhanced(
      resumeText || undefined,
      resumeFile || undefined,
      jobDescription || undefined
    );
    if (result) {
      setAnalysisResult(result);
      setShowResults(true);
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full">
      {/* Liquid animated background */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <main className="mx-auto relative z-10 flex min-h-[100svh] w-full max-w-6xl flex-col gap-8 p-6 md:p-10 text-white">
        <header className="mx-auto w-full max-w-3xl text-center">
          <div className="bg-[rgba(8,8,10,0.55)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Resume Insights
            </h1>
            <p className="mt-3 text-sm text-gray-300 font-medium">
              Upload your resume and get insights with job matching
              capabilities.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-red-900/40 border border-red-700/40 rounded-lg">
                <p className="text-sm text-red-300 font-medium">{error}</p>
              </div>
            )}
          </div>
        </header>

        <section className="mx-auto w-full max-w-3xl">
          <div className="bg-[rgba(8,8,10,0.6)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
            <ResumeTabs
              resumeText={resumeText}
              onResumeTextChange={setResumeText}
              resumeFile={resumeFile}
              onResumeFileChange={setResumeFile}
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onAnalyze={handleAnalyze}
              disabled={loading}
            />
          </div>
        </section>

        <section aria-live="polite" className="w-full">
          {loading ? (
            <LoaderSkeleton />
          ) : (
            <AnimatePresence initial={false}>
              {showResults && analysisResult && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Results Summary */}
                  <div className="lg:col-span-2">
                    <div className="bg-[rgba(12,12,16,0.6)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
                      <ResultsSummary
                        summary={analysisResult.resume_summary}
                        matchPercentage={analysisResult.match_percentage}
                        overallScore={analysisResult.overall_score}
                        recommendations={analysisResult.recommendations}
                      />
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="bg-[rgba(12,12,16,0.6)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
                    <SkillsList
                      skills={analysisResult.skills}
                      matchedSkills={analysisResult.matched_skills}
                      missingSkills={analysisResult.missing_skills}
                      showDetected={detailsVisible.detected}
                      showMatchedAndMissing={true}
                    />
                  </div>

                  {/* Entity Highlighter */}
                  {detailsVisible.entities && (
                    <div className="bg-[rgba(12,12,16,0.6)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
                      <EntityHighlighter entities={analysisResult.entities} />
                    </div>
                  )}

                  {/* Match Chart - if we have match data */}
            <div className="mt-4">
              <Separator />
              <div className="flex items-center justify-between mt-3 gap-2">
                <div className="text-sm text-gray-300">Show hidden analysis:</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={detailsVisible.detected ? 'default' : 'ghost'}
                    onClick={() => setDetailsVisible(v => ({ ...v, detected: !v.detected }))}
                  >
                    Detected Skills
                  </Button>
                  <Button
                    variant={detailsVisible.entities ? 'default' : 'ghost'}
                    onClick={() => setDetailsVisible(v => ({ ...v, entities: !v.entities }))}
                  >
                    Named Entities
                  </Button>
                  <Button
                    variant={'ghost'}
                    onClick={() => setDetailsVisible({ detected: true, entities: true })}
                  >
                    Show Both
                  </Button>
                </div>
              </div>
            </div>
                  {analysisResult.match_percentage && (
                    <div className="lg:col-span-2">
                      <div className="bg-[rgba(12,12,16,0.6)] p-6 rounded-2xl backdrop-blur-sm border border-white/6">
                        <MatchChart
                          data={[
                            {
                              skill: "Overall Match",
                              score: analysisResult.match_percentage,
                            },
                          ]}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>

        <footer className="mx-auto w-full max-w-6xl pt-4">
          <div className="h-px bg-white/6 mb-4" />
          <div className="bg-[rgba(8,8,10,0.55)] p-4 rounded-2xl border border-white/6">
            <p className="text-center text-xs text-gray-300 font-medium">
              Enhanced with FastAPI backend for comprehensive NLP analysis and
              job matching.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Page;
