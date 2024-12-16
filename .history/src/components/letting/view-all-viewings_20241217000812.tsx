import * as React from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Search, ChevronDown, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface IViewAllViewingsProps {
  onClose: () => void;
}

interface IViewingCard {
  id: string;
  property: string;
  address: string;
  date: string;
  time: string;
  status: "Felicity confirmed" | "Pending";
  slots: {
    booked: number;
    total: number;
  };
}

export function ViewAllViewings({ onClose }: IViewAllViewingsProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<string>("")
  const [selectedTime, setSelectedTime] = React.useState<string>("")

  const viewings: IViewingCard[] = [
    {
      id: "1",
      property: "Wharnof Property",
      address: "Unit 3, 181 Industrial Avenue, London, UK",
      date: "Thursday, 15th of November, 2024",
      time: "2:00PM to 6:00PM",
      status: "Felicity confirmed",
      slots: { booked: 6, total: 8 }
    },
    {
      id: "2",
      property: "Lucide Apartments",
      address: "Unit 9, 41 Oak Avenue, Manchester UK",
      date: "Friday 16th of November, 2024",
      time: "10:00PM to 6:00PM",
      status: "Pending",
      slots: { booked: 8, total: 8 }
    },
    {
      id: "3",
      property: "Verizon Property",
      address: "Unit 7, 32 Hemmings Avenue, London UK",
      date: "Monday 19th of November, 2024",
      time: "2:00PM to 6:00PM",
      status: "Felicity confirmed",
      slots: { booked: 6, total: 8 }
    }
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Upcoming viewings (32)</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Date
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Add date options */}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Time
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Add time options */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {viewings.map((viewing) => (
          <div key={viewing.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium">{viewing.property}</h3>
              <Badge 
                variant="outline"
                className={cn(
                  "capitalize",
                  viewing.status === "Felicity confirmed"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-amber-600 bg-amber-50"
                )}
              >
                {viewing.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <p>{viewing.address}</p>
              <p>{viewing.date}</p>
              <p>{viewing.time}</p>
              <p>{viewing.slots.booked} of {viewing.slots.total} slots booked</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          View more
        </Button>
      </div>
    </div>
  )
} 