import * as React from "react"
import { Table } from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Mail, Phone, MoreHorizontal, Search } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"

interface IViewing {
  id: string;
  name: string;
  agent: string;
  property: string;
  status: "confirmed" | "pending" | "visited" | "no show";
  time: string;
  outcome?: "visited" | "no show";
}

const getStatusStyles = (status: IViewing['status']) => {
  switch (status) {
    case "confirmed":
      return "border-emerald-500 text-emerald-600 bg-emerald-50"
    case "pending":
      return "border-yellow-500 text-yellow-600 bg-yellow-50"
    case "visited":
      return "border-blue-500 text-blue-600 bg-blue-50"
    case "no show":
      return "border-red-500 text-red-600 bg-red-50"
    default:
      return "border-gray-500 text-gray-600 bg-gray-50"
  }
}

export function ViewingTable() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'pending' | 'completed'>('upcoming')
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const viewings: IViewing[] = [
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
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "visited",
      time: "10:00 PM - 12:00 PM",
      outcome: "visited"
    },
    {
      id: "4",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "no show",
      time: "10:00 PM - 12:00 PM",
      outcome: "no show"
    }
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 border-b border-transparent">
          {(['upcoming', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 px-2 text-sm font-medium capitalize -mb-[1px]",
                activeTab === tab 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-[240px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <thead>
            <tr className="bg-gray-50/50">
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
            {viewings.map((viewing) => (
              <tr key={viewing.id} className="border-t">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{viewing.name}</div>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.agent}</td>
                <td className="py-3 px-4 text-gray-500">{viewing.property}</td>
                <td className="py-3 px-4">
                  <Badge 
                    variant="outline"
                    className={cn(
                      "capitalize font-medium",
                      getStatusStyles(viewing.status)
                    )}
                  >
                    {viewing.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.time}</td>
                <td className="py-3 px-4">
                  {viewing.outcome ? (
                    <Badge 
                      variant="outline"
                      className={cn(
                        "capitalize font-medium",
                        viewing.outcome === "visited" 
                          ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                          : "border-red-500 text-red-600 bg-red-50"
                      )}
                    >
                      {viewing.outcome}
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm" className="text-gray-700">
                      Set Outcome
                    </Button>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem>
                          Reschedule Viewing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel Viewing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
} 