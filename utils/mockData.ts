export function generateTimeSeriesData(days: number) {
  const data = []
  const today = new Date()
  
  // 使用固定的种子数据
  const seedData = {
    normal: [75, 82, 78, 85, 80, 77, 83, 79, 81, 84, 76, 82, 85, 79, 83,
             80, 78, 84, 77, 81, 83, 76, 85, 79, 82, 80, 78, 83, 81, 84],
    overtime: [8, 6, 9, 7, 10, 8, 5, 11, 7, 6, 9, 8, 6, 10, 7,
               9, 8, 6, 11, 7, 8, 10, 5, 9, 7, 8, 11, 6, 9, 7],
    unqualified: [5, 4, 6, 3, 5, 7, 4, 5, 6, 4, 7, 3, 5, 4, 6,
                  5, 7, 3, 5, 6, 4, 7, 3, 5, 6, 4, 5, 7, 4, 6]
  }

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split('T')[0],
      normalOrders: seedData.normal[days - 1 - i],     // 使用固定数据
      overtimeOrders: seedData.overtime[days - 1 - i], // 使用固定数据
      unqualifiedOrders: seedData.unqualified[days - 1 - i] // 使用固定数据
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

