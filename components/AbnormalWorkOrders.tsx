"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { ResponsivePie } from "@nivo/pie"

const data = [
  {
    id: "超时完成",
    label: "超时完成",
    value: 35,
    color: colors.orange.primary,
  },
  {
    id: "质量不达标",
    label: "质量不达标",
    value: 25,
    color: colors.red.primary,
  },
  {
    id: "执行偏差",
    label: "执行偏差",
    value: 20,
    color: colors.blue.primary,
  },
  {
    id: "资源冲突",
    label: "资源冲突",
    value: 15,
    color: colors.gray.primary,
  },
  {
    id: "其他异常",
    label: "其他异常",
    value: 5,
    color: colors.green.primary,
  },
]

export function AbnormalWorkOrders() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>异常工单聚类分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 展示不同类型异常工单的分布</p>
          <p>• 帮助识别主要问题，制定改进措施</p>
        </div>
      </CardContent>
    </Card>
  )
} 