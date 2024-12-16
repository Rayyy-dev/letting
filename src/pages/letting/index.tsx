import * as React from "react"
import { StatsCards } from "../../components/letting/stats-cards"
import { ViewingSchedules } from "../../components/letting/viewing-schedules"
import { ViewingTable } from "../../components/letting/viewing-table"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"
import { 
  Dialog, 
  DialogContent,
  DialogTrigger 
} from "../../components/ui/dialog"
import { AddSchedule, INewSchedule } from "../../components/letting/add-schedule"

export function LettingPage() {
  const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = React.useState(false);

  const handleScheduleAdd = (newSchedule: INewSchedule) => {
    console.log('New Schedule:', newSchedule);
    setIsAddScheduleDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lettings</h1>
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

      <StatsCards />
      <ViewingSchedules />
      <ViewingTable />
    </div>
  )
} 