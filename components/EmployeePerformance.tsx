"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { colors } from "@/utils/colors"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "张三", normal: 40, overtime: 10, incomplete: 5 },
  { name: "李四", normal: 35, overtime: 15, incomplete: 10 },
  { name: "王五", normal: 45, overtime: 5, incomplete: 2 },
  { name: "赵六", normal: 38, overtime: 12, incomplete: 8 },
  { name: "钱七", normal: 42, overtime: 8, incomplete: 3 },
]

const AbnormalOrderDetails = ({ employee }) => {
  const abnormalOrders = [
    { id: 1, type: "超时", description: "客房清洁超时30分钟", time: "2023-05-15 10:30" },
    { id: 2, type: "未完成", description: "健身房设备维护未完成", time: "2023-05-16 14:45" },
    { id: 3, type: "超时", description: "餐厅订单处理超时15分钟", time: "2023-05-17 12:20" },
  ]

  if (!abnormalOrders || abnormalOrders.length === 0) {
    return <div>No abnormal orders found for this employee.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>异常类型</TableHead>
          <TableHead>描述</TableHead>
          <TableHead>时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {abnormalOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.description}</TableCell>
            <TableCell>{order.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function EmployeePerformance() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>员工执行能力分析</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>员工</TableHead>
              <TableHead>总指令</TableHead>
              <TableHead>正常完成</TableHead>
              <TableHead>超时完成</TableHead>
              <TableHead>未完成</TableHead>
              <TableHead>正常完成率</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.normal + row.overtime + row.incomplete}</TableCell>
                <TableCell>{row.normal}</TableCell>
                <TableCell>{row.overtime}</TableCell>
                <TableCell>{row.incomplete}</TableCell>
                <TableCell>{((row.normal / (row.normal + row.overtime + row.incomplete)) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">异常指令溯源图</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="normal"
                name="正常"
                stackId="a"
                fill="hsl(120, 70%, 45%)"
                barSize={30}
              />
              <Bar
                dataKey="overtime"
                name="超时"
                stackId="a"
                fill="hsl(48, 95%, 50%)"
                barSize={30}
              />
              <Bar
                dataKey="incomplete"
                name="未完成"
                stackId="a"
                fill="hsl(0, 85%, 60%)"
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

