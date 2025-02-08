"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

const data = [
  { subject: "工单完成率", A: 120, B: 110, fullMark: 150 },
  { subject: "客户满意度", A: 98, B: 130, fullMark: 150 },
  { subject: "响应时间", A: 86, B: 130, fullMark: 150 },
  { subject: "质量合格率", A: 99, B: 100, fullMark: 150 },
  { subject: "员工效率", A: 85, B: 90, fullMark: 150 },
  { subject: "成本控制", A: 65, B: 85, fullMark: 150 },
]

export function PerformanceRadar() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>部门绩效对比分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar
                name="部门A"
                dataKey="A"
                stroke={colors.blue.primary}
                fill={colors.blue.primary}
                fillOpacity={0.6}
              />
              <Radar
                name="部门B"
                dataKey="B"
                stroke={colors.orange.primary}
                fill={colors.orange.primary}
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 从多个维度对比不同部门的绩效表现</p>
          <p>• 帮助识别部门优势和改进空间</p>
        </div>
      </CardContent>
    </Card>
  )
} 