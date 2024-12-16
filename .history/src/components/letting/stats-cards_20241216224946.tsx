import * as React from "react"
import { Card } from "../ui/card"
import { TrendingUp } from "lucide-react"
import { cn } from "../../lib/utils"

interface IStatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  lastUpdated: string;
}

function StatsCard({ title, value, trend, lastUpdated }: IStatsCardProps) {
  return (
    <Card className="p-6 bg-white shadow-sm border-gray-100">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-gray-500">{title}</p>
        <div className="flex items-start gap-2">
          <span className="text-[32px] leading-none font-semibold text-gray-900">{value}</span>
          {trend && (
            <span className={cn(
              "text-[13px] flex items-center gap-0.5 font-medium mt-1.5",
              "text-emerald-500"
            )}>
              <TrendingUp className="h-3.5 w-3.5" />
              {trend.value}
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-400">Last updated {lastUpdated}</p>
      </div>
    </Card>
  )
}

export function StatsCards() {
  const stats = [
    {
      title: "Total Viewings",
      value: "20",
      trend: {
        value: "+1.2%",
        isPositive: true
      },
      lastUpdated: "Dec 12, 2024"
    },
    {
      title: "Upcoming Viewings",
      value: "12",
      trend: {
        value: "+1.2%",
        isPositive: true
      },
      lastUpdated: "Dec 12, 2024"
    },
    {
      title: "Completed Viewings",
      value: "30",
      trend: {
        value: "+1.2%",
        isPositive: true
      },
      lastUpdated: "Dec 12, 2024"
    },
    {
      title: "Occupancy Rate",
      value: "67.2%",
      lastUpdated: "Dec 12, 2024"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
} 