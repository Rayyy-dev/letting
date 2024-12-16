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

interface IViewing {
  id: string;
  name: string;
  agent: string;
  property: string;
  status: "confirmed" | "pending" | "visited" | "no show";
  time: string;
  actions?: {
    reschedule?: boolean;
    cancel?: boolean;
  };
}

export function ViewingTable() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'pending' | 'completed'>('upcoming')
  const [agentSearch, setAgentSearch] = React.useState("")
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

  const agents = [
    "David James",
    "Jake Paul",
    "Victoria Shelf",
    "Willowbrook Brenda"
  ]

  const filteredAgents = agents.filter(agent => 
    agent.toLowerCase().includes(agentSearch.toLowerCase())
  )

  // Handlers for different actions
  const handleSetOutcome = (viewingId: string, outcome: "visited" | "no show") => {
    setViewings(viewings.map(viewing => 
      viewing.id === viewingId 
        ? { ...viewing, status: outcome }
        : viewing
    ))
  }

  const handleRescheduleViewing = (viewingId: string) => {
    setViewings(viewings.map(viewing => 
      viewing.id === viewingId 
        ? { 
            ...viewing, 
            actions: { ...viewing.actions, reschedule: true }
          }
        : viewing
    ))
  }

  const handleCancelViewing = (viewingId: string) => {
    setViewings(viewings.map(viewing => 
      viewing.id === viewingId 
        ? { 
            ...viewing, 
            actions: { ...viewing.actions, cancel: true }
          }
        : viewing
    ))
  }

  const handleChangeAgent = (viewingId: string, newAgent: string) => {
    setViewings(viewings.map(viewing => 
      viewing.id === viewingId 
        ? { ...viewing, agent: newAgent }
        : viewing
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
            <tr className="bg-gray-50 border-y">
              <td colSpan={7} className="py-2 px-4 text-sm font-medium">
                Today - 15th of November
              </td>
            </tr>
            {viewings.map((viewing) => (
              <tr key={viewing.id} className="border-t">
                <td className="py-3 px-4">
                  <div className="font-medium">{viewing.name}</div>
                </td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-gray-500 hover:text-gray-900">
                      {viewing.agent}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] p-2">
                      <div className="flex items-center px-2 pb-2 border-b">
                        <Search className="h-4 w-4 text-gray-500 mr-2" />
                        <Input
                          placeholder="Search..."
                          value={agentSearch}
                          onChange={(e) => setAgentSearch(e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="pt-2">
                        {filteredAgents.map((agent) => (
                          <DropdownMenuItem 
                            key={agent}
                            onClick={() => handleChangeAgent(viewing.id, agent)}
                          >
                            {agent}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.property}</td>
                <td className="py-3 px-4">
                  <Badge 
                    variant="outline"
                    className={cn(
                      "capitalize",
                      viewing.status === "confirmed" 
                        ? "text-emerald-600 bg-emerald-50" 
                        : "text-amber-600 bg-amber-50"
                    )}
                  >
                    {viewing.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.time}</td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-gray-500 hover:text-gray-900">
                      Set Outcome
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSetOutcome(viewing.id, "visited")}>
                        Visited
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSetOutcome(viewing.id, "no show")}>
                        No Show
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-between gap-2">
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
                          <DropdownMenuItem onClick={() => handleRescheduleViewing(viewing.id)}>
                            <span className="flex items-center">
                              ↻ Reschedule Viewing
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => handleCancelViewing(viewing.id)}
                          >
                            <span className="flex items-center">
                              ✕ Cancel Viewing
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {viewing.actions?.reschedule && (
                      <span className="text-xs text-gray-500">↻ Reschedule Viewing</span>
                    )}
                    {viewing.actions?.cancel && (
                      <span className="text-xs text-red-500">✕ Cancel Viewing</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 border-y">
              <td colSpan={7} className="py-2 px-4 text-sm font-medium">
                Tomorrow - 16th of November
              </td>
            </tr>
            {/* Tomorrow's viewings */}
          </tbody>
        </Table>
      </div>
    </div>
  )
} 