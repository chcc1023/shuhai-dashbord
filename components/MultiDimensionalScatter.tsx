"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { x: 45, y: 92, location: "前广场外围" },
  { x: 45, y: 92, location: "商铺" },
  { x: 45, y: 92, location: "商铺1楼" },
  { x: 41, y: 88, location: "商铺2楼" },
  { x: 41, y: 88, location: "1栋写字楼" },
  { x: 41, y: 88, location: "负一层" }
]

const locationColors = {
  "前广场外围": colors.chart.blue,    // 蓝色
  "商铺": colors.chart.orange,        // 橙色
  "商铺1楼": colors.chart.purple,     // 紫色
  "商铺2楼": colors.chart.green,      // 绿色
  "1栋写字楼": colors.chart.red,      // 红色
  "负一层": "hsl(280, 70%, 45%)"      // 深紫色
}

function jitter(value: number, factor = 0.5): number {
  return value + (Math.random() - 0.5) * factor;
}

export function MultiDimensionalScatter() {
  // 为重叠点添加轻微随机偏移
  const processedData = data.map(item => ({
    ...item,
    x: jitter(item.x, 0.8),  // x轴偏移范围 ±0.4
    y: jitter(item.y, 0.4),  // y轴偏移范围 ±0.2
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>工单多维度分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey="x" 
                name="工单数量" 
                unit="个"
                label={{ value: '工单数量（个）', position: 'bottom' }} 
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="合格率" 
                unit="%"
                domain={[80, 100]}
                label={{ value: '工单合格率（%）', angle: -90, position: 'left' }} 
              />
              <Tooltip 
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const x = payload[0].payload.x;
                    const y = payload[0].payload.y;
                    const overlappingPoints = data.filter(item => item.x === x && item.y === y);
                    
                    return (
                      <div className="bg-white p-2 border border-gray-200 shadow-sm">
                        {overlappingPoints.map((point, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-bold">{point.location}</p>
                            <p>工单数量: {point.x}个</p>
                            <p>合格率: {point.y}%</p>
                            {index < overlappingPoints.length - 1 && <hr className="my-2" />}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {Object.entries(locationColors).map(([location, color], index) => (
                <Scatter 
                  key={location}
                  name={location} 
                  data={data.filter(item => item.location === location)} 
                  fill={color}
                  shape={(props) => {
                    const { cx, cy } = props;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={12}  // 从 20 改为 12，调整为适中大小
                        fill={color}
                      />
                    );
                  }}
                  onClick={(data) => {
                    console.log(data);
                  }}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 横轴表示工单数量</p>
          <p>• 纵轴表示工单合格率</p>
          <div className="flex gap-4 mt-2">
            {Object.entries(locationColors).map(([location, color]) => (
              <div key={location} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{location}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 