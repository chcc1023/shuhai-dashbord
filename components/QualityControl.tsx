"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 定义质检状态标签组件
function QualityBadge({ status }: { status: "qualified" | "unqualified" }) {
  const config = {
    qualified: {
      label: "合格",
      className: "bg-green-50 text-green-800",
    },
    unqualified: {
      label: "不合格",
      className: "bg-red-50 text-red-800",
    },
  }
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config[status].className}`}
    >
      {config[status].label}
    </span>
  )
}

const qualityData = {
  totalOrders: 100,
  qualifiedOrders: 85,    // 合格工单
  unqualifiedOrders: 15   // 不合格工单
}

const highFrequencyIssues = [
  { 
    defectType: "污渍",
    space: "前广场外围", 
    equipment: "地面",
    count: 12,
    employee: "张三"
  },
  { 
    defectType: "积水",
    space: "商铺1楼", 
    equipment: "楼梯",
    count: 8,
    employee: "李四"
  },
  { 
    defectType: "满溢",
    space: "1栋写字楼", 
    equipment: "垃圾桶",
    count: 6,
    employee: "王五"
  },
  { 
    defectType: "生活垃圾",
    space: "负一层", 
    equipment: "地面",
    count: 5,
    employee: "赵六"
  }
]

export function QualityControl() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>质量总控中心</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-lg font-semibold mb-2">当日质检统计</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>质检工单总数：</span>
              <span className="font-medium">{qualityData.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <QualityBadge status="qualified" />
              <span className="font-medium text-green-600">{qualityData.qualifiedOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <QualityBadge status="unqualified" />
              <span className="font-medium text-red-600">{qualityData.unqualifiedOrders}</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">高频问题追踪墙（近30天）（显示规则：同一个空间、设施设备发现相同缺陷超过2次即显示，当前页展示最高发生次数的前10条）</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>缺陷类型</TableHead>
                <TableHead>空间</TableHead>
                <TableHead>设施设备</TableHead>
                <TableHead>发生次数</TableHead>
                <TableHead>责任人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highFrequencyIssues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>{issue.defectType}</TableCell>
                  <TableCell>{issue.space}</TableCell>
                  <TableCell>{issue.equipment}</TableCell>
                  <TableCell className="font-medium">{issue.count}</TableCell>
                  <TableCell>{issue.employee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10 text-sm text-gray-500">
            <p>• 展示近30天内频繁出现的缺陷</p>
            <p>• 帮助识别重点改进区域和设施设备</p>
            <p>• 追踪问题对应责任人</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

