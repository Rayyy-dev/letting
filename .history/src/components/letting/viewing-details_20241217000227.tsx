import * as React from "react"
import { Badge } from "../ui/badge"
import { Table } from "../ui/table"
import { MapPin, Calendar, Clock, Users, X, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ViewAllViewings } from "./view-all-viewings"

interface IViewingDetails {
  id: string;
  property: string;
  address: string;
  date: string;
  time: string;
  agent: string;
  slots: Array<{
    id: string;
    time: string;
    prospect: string;
    email: string;
    status: "confirmed" | "pending";
    outcome?: "visited" | "no show";
  }>;
}

interface IViewingDetailsProps {
  viewing: IViewingDetails;
  onClose: () => void;
}

export function ViewingDetails({ viewing, onClose }: IViewingDetailsProps) {
  const [slots, setSlots] = React.useState(viewing.slots);

  const handleSetOutcome = (slotId: string, outcome: "visited" | "no show") => {
    setSlots(slots.map(slot => 
      slot.id === slotId ? { ...slot, outcome } : slot
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Viewing Schedules : {viewing.property} - Unit 3
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          181 Industrial Avenue, London, UK
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          8:00 AM to 12:00 AM
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          Thursday, 15th of November, 2024
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          Agent: Debra Holt
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-[2px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 w-6 rounded-sm",
                  i < 6 ? "bg-sky-500" : "bg-gray-200"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            Available slots :2
          </span>
        </div>
      </div>

      <Table>
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">S/N</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Prospect</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "1", time: "8:00 AM - 8:30 AM", prospect: "Olivia Rodriguez", email: "Olivia@example.com", status: "confirmed" },
            { id: "2", time: "8:30 AM - 9:00 AM", prospect: "Sophia Lee", email: "sophia@example.com", status: "pending" },
            { id: "3", time: "9:00 AM - 9:30 AM", prospect: "Ethan Thompson", email: "Ethan@example.com", status: "confirmed" },
            { id: "4", time: "9:30 AM - 10:00 AM", prospect: "Olivia Rodriguez", email: "Olivia@example.com", status: "pending" },
            { id: "5", time: "10:00 AM - 10:30 AM", prospect: "Olivia Rodriguez", email: "Olivia@example.com", status: "pending" },
            { id: "6", time: "10:30 AM - 11:00 AM", prospect: "Olivia Rodriguez", email: "Olivia@example.com", status: "pending" }
          ].map((slot, index) => (
            <tr key={slot.id} className="border-b border-gray-200">
              <td className="py-4 px-4 text-sm text-gray-500">{index + 1}</td>
              <td className="py-4 px-4 text-sm text-gray-500">{slot.time}</td>
              <td className="py-4 px-4 text-sm text-gray-900">{slot.prospect}</td>
              <td className="py-4 px-4 text-sm text-gray-500">{slot.email}</td>
              <td className="py-4 px-4">
                <Badge 
                  variant="outline"
                  className={cn(
                    "font-normal",
                    slot.status === "confirmed" 
                      ? "text-emerald-600 bg-emerald-50" 
                      : "text-amber-600 bg-amber-50"
                  )}
                >
                  {slot.status}
                </Badge>
              </td>
              <td className="py-4 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm text-gray-500 hover:text-gray-900">
                    Set Outcome ▾
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSetOutcome(slot.id, "visited")}>
                      Visited
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetOutcome(slot.id, "no show")}>
                      No Show
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
} 