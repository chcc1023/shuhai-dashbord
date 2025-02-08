"use client"

import { EmployeePerformance } from "@/components/EmployeePerformance"
import { MultiDimensionalScatter } from "@/components/MultiDimensionalScatter"
import { QualityControl } from "@/components/QualityControl"
import { Button } from "@/components/ui/button"
import { WorkOrderOverview } from "@/components/WorkOrderOverview"
import { useEffect, useState } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { HelpCircle } from "lucide-react"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="font-semibold text-red-800">出现错误：</p>
      <pre className="mt-2 text-sm text-red-600">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
      >
        重试
      </button>
    </div>
  )
}

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">加载仪表板数据中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">工单与质检数据分析仪表板</h1>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>最后更新时间: {lastUpdated.toLocaleString()}</span>
          <div className="relative group">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute top-full right-1/2 translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
              数据每30分钟自动更新一次
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLastUpdated(new Date())}
          >
            刷新数据
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WorkOrderOverview />
          </ErrorBoundary>
        </div>
        
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QualityControl />
        </ErrorBoundary>
        
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MultiDimensionalScatter />
        </ErrorBoundary>
        
        <div className="lg:col-span-2">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <EmployeePerformance />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

