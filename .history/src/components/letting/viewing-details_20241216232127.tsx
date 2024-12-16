import * as React from "react"
import { Badge } from "../ui/badge"
import { Table } from "../ui/table"
import { MapPin, Calendar, Clock, Users, X } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

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
          Viewing Schedules : Wharf Property - Unit 3
        </h2>
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-500">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          {viewing.address}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          {viewing.time}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          {viewing.date}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
          Agent: {viewing.agent}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 bg-gray-100 flex-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 rounded-full transition-all"
            style={{ width: `${((slots.length - availableSlots) / slots.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">
          Available slots :{availableSlots}
        </span>
      </div>

      <Table>
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 text-sm font-medium text-gray-500">S/N</th>
            <th className="text-left py-3 text-sm font-medium text-gray-500">Time</th>
            <th className="text-left py-3 text-sm font-medium text-gray-500">Prospect</th>
            <th className="text-left py-3 text-sm font-medium text-gray-500">Email</th>
            <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
            <th className="text-left py-3 text-sm font-medium text-gray-500">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={slot.id} className="border-b">
              <td className="py-4 text-sm text-gray-500">{index + 1}</td>
              <td className="py-4 text-sm text-gray-500">{slot.time}</td>
              <td className="py-4 text-sm text-gray-900">{slot.prospect}</td>
              <td className="py-4 text-sm text-gray-500">{slot.email}</td>
              <td className="py-4">
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
              <td className="py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm text-gray-500 hover:text-gray-900">
                    {slot.outcome || "Set Outcome"} ▾
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