"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { generateHeatMapData, generateTimeSeriesData } from "@/utils/mockData"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { HeatMap } from "./HeatMap"
import { StatusBadge } from "./StatusBadge"

export function WorkOrderOverview() {
  const [heatMapType, setHeatMapType] = useState<'workload' | 'completion' | 'qualified'>('workload')
  const [heatMapData, setHeatMapData] = useState(generateHeatMapData('workload'))

  const staticData = {
    normalOrders: 75,    // 正常工单数
    overtimeOrders: 15,  // 超时工单数
    unqualifiedOrders: 10 // 未完成工单数
  }

  const pieData = [
    { name: "正常", value: staticData.normalOrders },
    { name: "超时", value: staticData.overtimeOrders },
    { name: "未完成", value: staticData.unqualifiedOrders }
  ]

  const totalOrders = staticData.normalOrders + staticData.overtimeOrders + staticData.unqualifiedOrders

  const heatMapTypes = [
    { value: 'workload', label: '工单数量分布' },
    { value: 'completion', label: '完成率分布' },
    { value: 'qualified', label: '合格率分布' },
  ] as const

  return (
    <Card className="w-full col-span-2 bg-white shadow-sm">
      <CardHeader className="border-b border-gray-200">
        <CardTitle>工单执行总览</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span>高优先级预警 (6)</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>前广场外围连续3天清洁质量未达标，建议重点关注（规则：同一作业空间连续3天质检不合格时触发预警）</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>部分质检工单完成时间超出规定范围，建议关注（规则：例如，若员工作业完成时间为09:00，则对应质检工单必须在09:00-09:20内完成，否则触发预警）</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>张三今日已有5个工单指令超时，可能需要工作量调整（规则：设当日总指令数为N，未完成或超时指令数为U；当N≤5时，若U≥1则预警；当N{'>'}5时，若U/N{'>'}50%则预警）</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>李四今日有3个工单指令未完成，建议关注（规则：设当日总指令数为N，未完成或超时指令数为U；当N≤5时，若U≥1则预警；当N{'>'}5时，若U/N{'>'}50%则预警）</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>王五今日工单作业时长仅15分钟，建议关注（规则：作业人员当天开始作业到完成作业时间小于15分钟时触发预警）</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>赵六连续3天工单未完成，建议重点关注（规则：作业人员连续3天工单均未完成时触发预警）</span>
              <span className="text-red-600">›</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-600">今日工单总量</div>
              <div className="relative group">
                <span className="cursor-help text-gray-400 text-sm">?</span>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  与昨日数据对比的变化趋势
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">150</span>
              <span className="text-sm text-green-600">↑ 12%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">较昨日 +18单</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-600">准时完成率</div>
              <div className="relative group">
                <span className="cursor-help text-gray-400 text-sm">?</span>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  与昨日数据对比的变化趋势
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">86.5%</span>
              <span className="text-sm text-red-600">↓ 2.1%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">目标 90%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-600">质检合格率</div>
              <div className="relative group">
                <span className="cursor-help text-gray-400 text-sm">?</span>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  与昨日数据对比的变化趋势
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">92.3%</span>
              <span className="text-sm text-green-600">↑ 1.4%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">目标 95%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-600">平均处理时长</div>
              <div className="relative group">
                <span className="cursor-help text-gray-400 text-sm">?</span>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  与昨日数据对比的变化趋势
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">32分</span>
              <span className="text-sm text-green-600">↑ 效率提升（↓效率下降）</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">较昨日 -5分钟</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">工单健康度</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {value}
                      </text>
                    );
                  }}
                  labelLine={false}
                >
                  <Cell fill="hsl(120, 70%, 45%)" />
                  <Cell fill="hsl(48, 95%, 50%)" />
                  <Cell fill="hsl(0, 85%, 60%)" />
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  layout="horizontal"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">当日工单统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">总指令</span>
                <span className="font-medium text-gray-900">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="normal" />
                <span className="font-medium text-green-600">{staticData.normalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="overtime" />
                <span className="font-medium text-yellow-600">{staticData.overtimeOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="unqualified" />
                <span className="font-medium text-red-600">{staticData.unqualifiedOrders}</span>
              </div>
            </div>
            <div className="mt-16 text-sm">
              <p className="flex items-center gap-2">
                <StatusBadge status="normal" />
                <span className="text-gray-500">表示正常执行完成</span>
              </p>
              <p className="flex items-center gap-2">
                <StatusBadge status="overtime" />
                <span className="text-gray-500">表示超时完成指令</span>
              </p>
              <p className="flex items-center gap-2">
                <StatusBadge status="unqualified" />
                <span className="text-gray-500">表示未完成指令</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">工单趋势（近30天）</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={generateTimeSeriesData(30)}>
              <XAxis dataKey="date" stroke={colors.neutral[600]} />
              <YAxis stroke={colors.neutral[600]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="normalOrders" 
                name="正常" 
                stroke="hsl(120, 70%, 45%)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="overtimeOrders" 
                name="超时" 
                stroke="hsl(48, 95%, 50%)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="unqualifiedOrders" 
                name="未完成" 
                stroke="hsl(0, 85%, 60%)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {heatMapData && heatMapData.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">作业指令分析热力图</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">工单数量分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('workload')} type="workload" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">完成率分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('completion')} type="completion" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">合格率分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('qualified')} type="qualified" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>• 横轴表示工作日，纵轴表示时段</p>
              <p>• 颜色深浅表示数值大小</p>
              <p>• 可用于发现工作规律和异常模式</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

