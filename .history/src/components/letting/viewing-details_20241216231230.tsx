import * as React from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Table } from "../ui/table"
import { MapPin, Calendar, Clock, Users } from "lucide-react"
import { cn } from "../../lib/utils"

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
    outcome?: string;
  }>;
}

interface IViewingDetailsProps {
  viewing: IViewingDetails;
  onClose: () => void;
}

export function ViewingDetails({ viewing, onClose }: IViewingDetailsProps) {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Viewing Schedules : {viewing.property} - Unit 3
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4 text-sky-500" />
          {viewing.address}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-2 h-4 w-4 text-sky-500" />
          {viewing.time}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4 text-sky-500" />
          {viewing.date}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-2 h-4 w-4 text-sky-500" />
          Agent: {viewing.agent}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 bg-gray-100 flex-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 rounded-full"
            style={{ width: `${(viewing.slots.filter(s => s.status === "confirmed").length / viewing.slots.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">
          Available slots :{viewing.slots.filter(s => s.status === "pending").length}
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
          {viewing.slots.map((slot, index) => (
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
                <button className="text-sm text-gray-500 hover:text-gray-900">
                  Set Outcome ▾
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
} 