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

interface IViewingDayTable {
  readonly date: string;
  readonly viewings: ReadonlyArray<IViewing>;
  readonly onViewingUpdate: (viewing: IViewing) => void;
}

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

export function ViewingDayTable({ date, viewings, onViewingUpdate }: Readonly<IViewingDayTable>) {
  const [agentSearch, setAgentSearch] = React.useState("")

  const agents = [
    "David James",
    "Jake Paul",
    "Victoria Shelf",
    "Willowbrook Brenda"
  ]

  const filteredAgents = agents.filter(agent => 
    agent.toLowerCase().includes(agentSearch.toLowerCase())
  )

  // Handlers
  const handleSetOutcome = (viewing: IViewing, outcome: "visited" | "no show") => {
    onViewingUpdate({ ...viewing, outcome })
  }

  const handleChangeAgent = (viewing: IViewing, newAgent: string) => {
    onViewingUpdate({ ...viewing, agent: newAgent })
  }

  const handleRescheduleViewing = (viewing: IViewing) => {
    onViewingUpdate({
      ...viewing,
      actions: { ...viewing.actions, reschedule: true }
    })
  }

  const handleCancelViewing = (viewing: IViewing) => {
    onViewingUpdate({
      ...viewing,
      actions: { ...viewing.actions, cancel: true }
    })
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <thead>
          <tr className="bg-gray-50 border-y">
            <td colSpan={7} className="py-2 px-4 text-sm font-medium">
              {date}
            </td>
          </tr>
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
                          onClick={() => handleChangeAgent(viewing, agent)}
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
                {viewing.outcome ? (
                  <Badge 
                    variant="outline"
                    className={cn(
                      "capitalize",
                      viewing.outcome === "visited"
                        ? "text-blue-600 bg-blue-50"
                        : "text-red-600 bg-red-50"
                    )}
                  >
                    {viewing.outcome}
                  </Badge>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-gray-500 hover:text-gray-900">
                      Set Outcome
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSetOutcome(viewing, "visited")}>
                        Visited
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSetOutcome(viewing, "no show")}>
                        No Show
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
                        <DropdownMenuItem onClick={() => handleRescheduleViewing(viewing)}>
                          <span className="flex items-center">
                            ↻ Reschedule Viewing
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500"
                          onClick={() => handleCancelViewing(viewing)}
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
        </tbody>
      </Table>
    </div>
  )
} 