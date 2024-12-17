import * as React from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Search, ChevronDown, MapPin, Calendar, Clock, Users, Plus } from "lucide-react"
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

function StatusBadge({ status }: { status: "confirmed" | "pending" }) {
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium text-xs px-2 py-0.5 rounded",
        status === "confirmed" 
          ? "text-emerald-600 bg-emerald-50" 
          : "text-amber-600 bg-amber-50"
      )}
    >
      {status === "confirmed" ? "Confirmed" : "Pending"}
    </Badge>
  )
}

function OutcomeBadge({ outcome }: { outcome?: "visited" | "no show" }) {
  if (!outcome) return null;
  
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium text-xs px-2 py-0.5 rounded",
        outcome === "visited" 
          ? "text-emerald-600 bg-emerald-50"
          : "text-red-600 bg-red-50"
      )}
    >
      {outcome === "visited" ? "Visited" : "No show"}
    </Badge>
  )
}

export function ViewAllViewings() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDateFilterActive, setIsDateFilterActive] = React.useState(false)
  const [isTimeFilterActive, setIsTimeFilterActive] = React.useState(false)
  const [visibleViewingsCount, setVisibleViewingsCount] = React.useState(9)

  const handleViewingsLoadMore = () => {
    setVisibleViewingsCount(prev => prev + 9)
  }

  const handleFilterChange = (filterType: "date" | "time", value: string) => {
    if (filterType === "date") setIsDateFilterActive(true)
    if (filterType === "time") setIsTimeFilterActive(true)
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

  const visibleItems = properties.slice(0, visibleViewingsCount)
  const hasMore = visibleViewingsCount < properties.length

  return (
    <div className="h-[90vh] flex flex-col">
      <div className="bg-white border-b px-6 pt-6">
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

          <Button variant="outline" className="gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
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
              <Button variant="outline" className="flex items-center gap-2">
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
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-4">
          {visibleItems.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between pb-3 mb-4 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-900">{property.property}</h3>
                <StatusBadge status={property.status} />
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
                  <p>{property.address}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
                  <p>{property.date}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
                  <p>{property.time}</p>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
                  <p>{property.slots.booked} of {property.slots.total} slots booked</p>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
              >
                View Details
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <Button 
              variant="outline"
              onClick={handleViewingsLoadMore}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              View more
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 