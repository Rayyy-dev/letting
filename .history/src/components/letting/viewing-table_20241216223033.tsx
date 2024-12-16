import * as React from "react"
import { Table } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Mail, Phone, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./c

interface IViewing {
  id: string;
  name: string;
  agent: string;
  property: string;
  status: "confirmed" | "pending" | "visited" | "no show";
  time: string;
}

export function ViewingTable() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'pending' | 'completed'>('upcoming')
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
      time: "10:00 PM - 12:00 PM"
    },
    {
      id: "4",
      name: "Olivia Rodriguez",
      agent: "David James",
      property: "Wharf Property, 4A",
      status: "no show",
      time: "10:00 PM - 12:00 PM"
    }
  ]

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {(['upcoming', 'pending', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-2 text-sm font-medium capitalize ${
              activeTab === tab 
                ? 'border-b-2 border-black text-black' 
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
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
            {viewings.map((viewing) => (
              <tr key={viewing.id} className="border-t">
                <td className="py-3 px-4">
                  <div className="font-medium">{viewing.name}</div>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.agent}</td>
                <td className="py-3 px-4 text-gray-500">{viewing.property}</td>
                <td className="py-3 px-4">
                  <Badge 
                    variant={
                      viewing.status === "confirmed" ? "success" : 
                      viewing.status === "pending" ? "warning" :
                      viewing.status === "visited" ? "default" :
                      "destructive"
                    }
                    className="capitalize"
                  >
                    {viewing.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-gray-500">{viewing.time}</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">
                    Set Outcome
                  </Button>
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
          </tbody>
        </Table>
      </div>
    </div>
  )
} 