import * as React from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Search, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface IViewAllViewingsProps {
  onClose?: () => void;
}

interface IViewingProperty {
  id: string;
  property: string;
  address: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
  slots: {
    booked: number;
    total: number;
  };
}

export function ViewAllViewings() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<string>("")
  const [selectedTime, setSelectedTime] = React.useState<string>("")
  const [visibleProperties, setVisibleProperties] = React.useState(9)

  const handleLoadMore = () => {
    setVisibleProperties(prev => prev + 9)
  }

  const properties: IViewingProperty[] = React.useMemo(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: `property-${i + 1}`,
      property: `Wharnof Property ${i + 1}`,
      address: "Unit 3, 181 Industrial Avenue, London, UK",
      date: "Thursday, 15th of November, 2024",
      time: "2:00PM to 6:00PM",
      status: i % 2 === 0 ? "confirmed" : "pending",
      slots: { booked: 6, total: 8 }
    }))
  , [])

  const visibleItems = properties.slice(0, visibleProperties)
  const hasMore = visibleProperties < properties.length

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-6">Upcoming viewings (32)</h2>

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
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>Tomorrow</DropdownMenuItem>
            <DropdownMenuItem>This Week</DropdownMenuItem>
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
            <DropdownMenuItem>Morning</DropdownMenuItem>
            <DropdownMenuItem>Afternoon</DropdownMenuItem>
            <DropdownMenuItem>Evening</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {visibleItems.map((property) => (
          <div key={property.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium">{property.property}</h3>
              <Badge 
                variant="outline"
                className={cn(
                  "capitalize",
                  property.status === "confirmed"
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-amber-600 bg-amber-50"
                )}
              >
                {property.status === "confirmed" ? "Felicity confirmed" : "Pending"}
              </Badge>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <p>{property.address}</p>
              <p>{property.date}</p>
              <p>{property.time}</p>
              <p>{property.slots.booked} of {property.slots.total} slots booked</p>
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

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline"
            onClick={handleLoadMore}
          >
            View more
          </Button>
        </div>
      )}
    </div>
  )
} 