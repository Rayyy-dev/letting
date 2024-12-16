import * as React from "react"
import { Table } from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Mail, Phone, MoreHorizontal, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface IViewing {
  id: string;
  name: string;
  agent: {
    name: string;
    searchTerm?: string;  // For search functionality
  };
  property: {
    name: string;
    searchTerm?: string;  // For search functionality
  };
  status: "confirmed" | "pending" | "visited" | "no show";
  time: string;
  date: string;
}

export function ViewingTable() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'pending' | 'completed'>('upcoming')

  const viewings: IViewing[] = [
    // Today - 15th of November
    {
      id: "1",
      name: "Olivia Rodriguez",
      agent: { name: "David James" },
      property: { name: "Wharf Property, 4A" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Today - 15th of November"
    },
    {
      id: "2",
      name: "Olivia Rodriguez",
      agent: { name: "David James" },
      property: { name: "Wharf Property, 4A" },
      status: "pending",
      time: "10:00 PM - 12:00 PM",
      date: "Today - 15th of November"
    },
    {
      id: "3",
      name: "Olivia Rodriguez",
      agent: { 
        name: "Willowbrook Brenda",
        searchTerm: "Search..."
      },
      property: { name: "" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Today - 15th of November"
    },
    {
      id: "4",
      name: "Olivia Rodriguez",
      agent: { name: "Jake Paul" },
      property: { name: "Nova Prol" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Today - 15th of November"
    },
    {
      id: "5",
      name: "Olivia Rodriguez",
      agent: { name: "Victoria Shelf" },
      property: { name: "Wharf Property, 4A" },
      status: "pending",
      time: "10:00 PM - 12:00 PM",
      date: "Today - 15th of November"
    },
    // Tomorrow - 16th of November
    {
      id: "6",
      name: "Olivia Rodriguez",
      agent: { name: "David James" },
      property: { name: "Wharf Property, 4A" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Tomorrow - 16th of November"
    },
    {
      id: "7",
      name: "Olivia Rodriguez",
      agent: { name: "David James" },
      property: { name: "Wharf Property, 4A" },
      status: "pending",
      time: "10:00 PM - 12:00 PM",
      date: "Tomorrow - 16th of November"
    },
    {
      id: "8",
      name: "Olivia Rodriguez",
      agent: { 
        name: "Willowbrook Brenda",
        searchTerm: "Search..."
      },
      property: { name: "" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Tomorrow - 16th of November"
    },
    {
      id: "9",
      name: "Olivia Rodriguez",
      agent: { name: "Jake Paul" },
      property: { name: "" },
      status: "pending",
      time: "10:00 PM - 12:00 PM",
      date: "Tomorrow - 16th of November"
    },
    {
      id: "10",
      name: "Olivia Rodriguez",
      agent: { name: "Victoria Shelf" },
      property: { name: "" },
      status: "confirmed",
      time: "10:00 PM - 12:00 PM",
      date: "Tomorrow - 16th of November"
    }
  ]

  // Group viewings by date
  const viewingsByDate = React.useMemo(() => {
    return viewings.reduce((acc, viewing) => {
      if (!acc[viewing.date]) {
        acc[viewing.date] = [];
      }
      acc[viewing.date].push(viewing);
      return acc;
    }, {} as Record<string, IViewing[]>);
  }, [viewings]);

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
        <Button 
          variant="ghost" 
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Agent</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Property</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Viewing Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Time</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Outcome</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(viewingsByDate).map(([date, dateViewings]) => (
              <React.Fragment key={date}>
                <tr className="bg-gray-50">
                  <td colSpan={7} className="py-2 px-4 text-sm font-medium text-gray-900">
                    {date}
                  </td>
                </tr>
                {dateViewings.map((viewing) => (
                  <tr key={viewing.id} className="border-t">
                    <td className="py-3 px-4">
                      <div className="font-medium">{viewing.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {viewing.agent.searchTerm ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder={viewing.agent.searchTerm}
                            className="text-sm border rounded px-2 py-1"
                          />
                        </div>
                      ) : (
                        viewing.agent.name
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {viewing.property.searchTerm ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder={viewing.property.searchTerm}
                            className="text-sm border rounded px-2 py-1"
                          />
                        </div>
                      ) : (
                        viewing.property.name
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline"
                        className={cn(
                          "capitalize",
                          {
                            "text-emerald-600 bg-emerald-50": viewing.status === "confirmed",
                            "text-amber-600 bg-amber-50": viewing.status === "pending",
                            "text-blue-600 bg-blue-50": viewing.status === "visited",
                            "text-red-600 bg-red-50": viewing.status === "no show"
                          }
                        )}
                      >
                        {viewing.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{viewing.time}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Set Outcome
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            Visited
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            No Show
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Viewing
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Reschedule Viewing</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Cancel Viewing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
} 