import * as React from "react"
import { Table } from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Mail, Phone, MoreHorizontal, Search, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { ViewingDayTable } from "./viewing-day-table"

interface IViewing {
  id: string;
  name: string;
  agent: string;
  property: string;
  status: "confirmed" | "pending";
  outcome?: "visited" | "no show";
  time: string;
  actions?: {
    reschedule?: boolean;
    cancel?: boolean;
  };
}

export function ViewingTable() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'pending' | 'completed'>('upcoming')
  const [viewings, setViewings] = React.useState<IViewing[]>([
    // Today - 15th of November
    {
      id: "1",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "2",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "pending",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "3",
      name: "Olivia Rodriguez",
      agent: "Willowbrook Brenda",
      property: "",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "4",
      name: "Olivia Rodriguez",
      agent: "Jake Paul",
      property: "",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "5",
      name: "Olivia Rodriguez",
      agent: "Victoria Shelf",
      property: "",
      status: "pending",
      time: "10:00 PM - 12:00 PM"
    },
    // Tomorrow - 16th of November
    {
      id: "6",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "7",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "pending",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "8",
      name: "Olivia Rodriguez",
      agent: "Willowbrook Brenda",
      property: "",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "9",
      name: "Olivia Rodriguez",
      agent: "Jake Paul",
      property: "",
      status: "pending",
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "10",
      name: "Olivia Rodriguez",
      agent: "Victoria Shelf",
      property: "",
      status: "confirmed",
      time: "10:00 PM - 12:00 PM"
    }
  ])

  // Group viewings by date
  const viewingsByDate = React.useMemo(() => {
    return viewings.reduce((acc, viewing) => {
      const date = viewing.id <= "5" 
        ? "Today - 15th of November"
        : "Tomorrow - 16th of November"
      
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(viewing)
      return acc
    }, {} as Record<string, IViewing[]>)
  }, [viewings])

  const handleViewingUpdate = (updatedViewing: IViewing) => {
    setViewings(viewings.map(viewing => 
      viewing.id === updatedViewing.id ? updatedViewing : viewing
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 border-b">
          {(['upcoming', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 px-2 text-sm font-medium capitalize",
                activeTab === tab 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(viewingsByDate).map(([date, dateViewings]) => (
          <ViewingDayTable
            key={date}
            date={date}
            viewings={dateViewings}
            onViewingUpdate={handleViewingUpdate}
          />
        ))}
      </div>
    </div>
  )
} 