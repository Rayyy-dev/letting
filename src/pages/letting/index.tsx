import * as React from "react"
import { StatsCards } from "../../components/letting/stats-cards"
import { ViewingSchedules } from "../../components/letting/viewing-schedules"
import { ViewingTable } from "../../components/letting/viewing-table"
import { Button } from "../../components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
import { 
  Dialog, 
  DialogContent,
  DialogTrigger 
} from "../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { AddSchedule, INewSchedule } from "../../components/letting/add-schedule"

export function LettingPage() {
  const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = React.useState(false);
  const [propertySearch, setPropertySearch] = React.useState("");

  const properties = [
    "Wharf Property",
    "Lucide Apartments",
    "Verizon Property",
    "Skyline Towers",
    "Marina Heights",
    "The Pinnacle",
    "Royal Gardens",
    "City View Plaza"
  ];

  const filteredProperties = properties.filter(property =>
    property.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const handleScheduleAdd = (newSchedule: INewSchedule) => {
    console.log('New Schedule:', newSchedule);
    setIsAddScheduleDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lettings</h1>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter by Property
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] p-2">
              <div className="flex items-center px-2 pb-2 border-b mb-2">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <Input
                  placeholder="Search properties..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredProperties.map((property) => (
                  <DropdownMenuItem key={property}>
                    {property}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog 
            open={isAddScheduleDialogOpen} 
            onOpenChange={setIsAddScheduleDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-black/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0">
              <AddSchedule 
                onClose={() => setIsAddScheduleDialogOpen(false)}
                onAdd={handleScheduleAdd}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <StatsCards />
      <ViewingSchedules />
      <ViewingTable />
    </div>
  )
} 