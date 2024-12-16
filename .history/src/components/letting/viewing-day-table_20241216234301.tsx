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
  date: string;
  viewings: IViewing[];
  onViewingUpdate: (viewing: IViewing) => void;
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

export function ViewingDayTable({ date, viewings, onViewingUpdate }: IViewingDayTable) {
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
          {/* ... Rest of the table body implementation stays the same ... */}
        </tbody>
      </Table>
    </div>
  )
} 