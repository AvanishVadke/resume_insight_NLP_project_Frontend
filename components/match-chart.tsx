"use client"
import React, { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MatchDatum = { skill: string; score: number } // score 0..100

type MatchChartProps = {
  data: MatchDatum[]
  className?: string
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload || !payload.length) return null
  const val = payload[0].value
  return (
    <div className="rounded-md bg-[#060607] px-3 py-2 text-sm font-medium text-white border border-white/6 shadow-lg">
      <div className="font-semibold">{label}</div>
      <div className="text-gray-300">{val}% match</div>
    </div>
  )
}

export function MatchChart({ data, className }: MatchChartProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="font-black text-lg mb-4">Match Visualization</h3>
      <div className="h-64 w-full bg-black/40 p-4 rounded border border-white/6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={36}>
            <defs>
              <linearGradient id="grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={1} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#222" strokeWidth={1} vertical={false} />
            <XAxis
              dataKey="skill"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#E5E7EB", fontSize: 12, fontWeight: "600" }}
            />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#E5E7EB", fontSize: 12, fontWeight: "600" }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(124,58,237,0.06)" }} wrapperStyle={{ outline: "none" }} />
            <Bar dataKey="score" radius={[6, 6, 4, 4]} fill="url(#grad)">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  fillOpacity={hovered === index ? 1 : 0.9}
                  style={{
                    transition: 'transform 160ms ease, filter 160ms ease',
                    transform: hovered === index ? 'scaleY(1.06)' : 'none',
                    transformOrigin: 'center bottom',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
