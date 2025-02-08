export function generateTimeSeriesData(days: number) {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split('T')[0],
      normalOrders: Math.floor(Math.random() * 50) + 50,     // 50-100 正常工单
      overtimeOrders: Math.floor(Math.random() * 10) + 3,    // 3-13 超时工单
      unqualifiedOrders: Math.floor(Math.random() * 15) + 5, // 5-20 未完成工单
    })
  }

  return data
}

export function generateHeatMapData(type: 'workload' | 'completion' | 'qualified' = 'workload') {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}-${(i * 2 + 2) % 24}时`)

  switch (type) {
    case 'workload':
      return hours.map(hour => ({
        id: hour,
        data: days.map(day => ({
          x: day,
          y: Math.floor(Math.random() * 100) // 工单总数 0-100
        }))
      }))

    case 'completion':
      return hours.map(hour => ({
        id: hour,
        data: days.map(day => ({
          x: day,
          y: Math.floor(Math.random() * 40) + 60 // 正常完成率 60%-100%
        }))
      }))

    case 'qualified':
      return hours.map(hour => ({
        id: hour,
        data: days.map(day => ({
          x: day,
          y: Math.floor(Math.random() * 30) + 70 // 按时完成率 70%-100%
        }))
      }))
  }
}

export const generateNetworkData = () => {
  const nodes = [
    {
      id: "WorkOrder",
      group: 1,
      size: 24,
      color: "#2563eb",
      data: { height: 1 }
    },
    {
      id: "Quality",
      group: 2,
      size: 20,
      color: "#16a34a",
      data: { height: 0.8 }
    },
    {
      id: "Cleaning",
      group: 3,
      size: 16,
      color: "#ea580c",
      data: { height: 0.6 }
    },
    {
      id: "Maintenance",
      group: 3,
      size: 16,
      color: "#9333ea",
      data: { height: 0.6 }
    },
    {
      id: "CustomerService",
      group: 3,
      size: 16,
      color: "#6b7280",
      data: { height: 0.6 }
    }
  ]

  const links = [
    { source: "WorkOrder", target: "Quality", value: 5, distance: 80 },
    { source: "WorkOrder", target: "Cleaning", value: 3, distance: 100 },
    { source: "WorkOrder", target: "Maintenance", value: 2, distance: 100 },
    { source: "WorkOrder", target: "CustomerService", value: 1, distance: 100 },
    { source: "Quality", target: "Cleaning", value: 4, distance: 80 },
    { source: "Quality", target: "Maintenance", value: 3, distance: 80 },
    { source: "Quality", target: "CustomerService", value: 2, distance: 80 }
  ]

  return { nodes, links }
}

