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
    <Card className="p-4 bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.1)] border border-gray-100">
      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-gray-500">{title}</p>
        <div className="flex items-start gap-1.5">
          <span className="text-[28px] leading-none font-medium text-gray-900">{value}</span>
          {trend && (
            <span className="text-[13px] flex items-center gap-0.5 text-emerald-500 mt-1">
              <TrendingUp className="h-3 w-3" />
              {trend.value}
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">Last updated {lastUpdated}</p>
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