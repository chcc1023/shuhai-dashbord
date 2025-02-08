interface StatusBadgeProps {
  status: "normal" | "overtime" | "unqualified"
}

const statusConfig = {
  normal: {
    label: "正常",
    className: "bg-green-50 text-green-800",
  },
  overtime: {
    label: "超时",
    className: "bg-yellow-50 text-yellow-800",
  },
  unqualified: {
    label: "未完成",
    className: "bg-red-50 text-red-800",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

