"use client"

import { ResponsiveHeatMap } from "@nivo/heatmap"

type HeatMapType = 'workload' | 'completion' | 'qualified'

interface HeatMapData {
  id: string
  data: Array<{
    x: string
    y: number
  }>
}

interface HeatMapProps {
  data: HeatMapData[]
  type: HeatMapType
}

const heatMapConfig: Record<HeatMapType, {
  title: string
  valueFormat: string
  colors: "blues" | "greens" | "oranges"
  unit: string
  formatValue?: (value: number) => string
}> = {
  workload: {
    title: "工单数量",
    valueFormat: ",.0f",
    colors: "blues",
    unit: "个",
    formatValue: (value) => `${value}个`
  },
  completion: {
    title: "完成率",
    valueFormat: ",.1f",
    colors: "greens",
    unit: "%",
    formatValue: (value) => `${value.toFixed(1)}%`
  },
  qualified: {
    title: "合格率",
    valueFormat: ",.1f",
    colors: "oranges",
    unit: "%",
    formatValue: (value) => `${value.toFixed(1)}%`
  }
}

export function HeatMap({ data, type }: HeatMapProps) {
  if (!data || data.length === 0) return null

  const config = heatMapConfig[type]

  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 40, right: 20, bottom: 40, left: 60 }}
      valueFormat={config.valueFormat}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: "",
        legendOffset: 46
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -50
      }}
      colors={{
        type: "sequential",
        scheme: config.colors
      }}
      emptyColor="#555555"
      tooltip={({ cell }) => (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          <strong>{cell.data.x}</strong><br />
          时间段：{cell.serieId}<br />
          {config.formatValue ? config.formatValue(cell.data.y) : cell.data.y}
        </div>
      )}
    />
  )
}

