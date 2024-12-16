import * as React from "react"
import { Card } from "./ui/card"
import { TrendingUp } from "lucide-react"

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
    <Card className="p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold">{value}</span>
          {trend && (
            <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
              <TrendingUp className={`h-4 w-4 ${!trend.isPositive && 'rotate-180'}`} />
              {trend.value}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">Last updated {lastUpdated}</p>
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
        value: "1.2%",
        isPositive: true
      },
      lastUpdated: "Dec 12, 2024"
    },
    {
      title: "Upcoming Viewings",
      value: "12",
      trend: {
        value: "1.2%",
        isPositive: true
      },
      lastUpdated: "Dec 12, 2024"
    },
    {
      title: "Completed Viewings",
      value: "30",
      trend: {
        value: "1.2%",
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