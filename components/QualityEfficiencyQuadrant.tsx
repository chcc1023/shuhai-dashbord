"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { colors } from "@/utils/colors"

export function QualityEfficiencyQuadrant() {
  const data = [
    { name: "区域A", efficiency: 85, quality: 90, size: 120 },
    { name: "区域B", efficiency: 75, quality: 95, size: 100 },
    { name: "区域C", efficiency: 90, quality: 70, size: 150 },
    { name: "区域D", efficiency: 70, quality: 85, size: 90 },
    { name: "区域E", efficiency: 80, quality: 80, size: 110 },
  ]

  if (!data || data.length === 0) {
    return <div>No data available for quality-efficiency quadrant</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>效能-质量四象限</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="efficiency" name="效能" unit="%" />
            <YAxis type="number" dataKey="quality" name="质量" unit="%" />
            <ZAxis type="number" dataKey="size" range={[60, 400]} name="工单量" unit="个" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="区域" data={data} fill={colors.blue.primary} />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm">
          <p>右上角：高效能高质量（标杆区域）</p>
          <p>左上角：低效能高质量</p>
          <p>右下角：高效能低质量（风险关注区）</p>
          <p>左下角：低效能低质量</p>
        </div>
      </CardContent>
    </Card>
  )
}

