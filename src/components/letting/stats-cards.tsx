import * as React from "react"
import { Card } from "../ui/card"
import { TrendingUp } from "lucide-react"
import { cn } from "../../lib/utils"

interface IStatsCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly trend?: {
    readonly value: string;
    readonly isPositive: boolean;
  };
  readonly lastUpdated: string;
}

function StatsCard({ title, value, trend, lastUpdated }: Readonly<IStatsCardProps>) {
  return (
    <Card className="relative pt-4 pb-3 px-4 bg-white shadow-sm border-gray-100">
      <div className="pb-3 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trend && (
          <span className={cn(
            "text-xs flex items-center gap-0.5 font-medium",
            "text-emerald-500"
          )}>
            <TrendingUp className="h-3 w-3" />
            {trend.value}
          </span>
        )}
      </div>

      <p className="mt-1 text-[11px] text-gray-400">Last updated {lastUpdated}</p>
    </Card>
  )
}

export function StatsCards() {
  const STATS_DATA = [
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS_DATA.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
} 