import * as React from "react"
import { StatsCards } from "../../components/letting/stats-cards"
import { ViewingSchedules } from "../../components/letting/viewing-schedules"
import { ViewingTable } from "../../components/letting/viewing-table"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent } from "../../components/ui/dialog"
import { AddSchedule, INewSchedule } from "../../components/letting/add-schedule"

export function LettingPage() {
  const [isAddScheduleOpen, setIsAddScheduleOpen] = React.useState(false);

  const handleAddSchedule = (newSchedule: INewSchedule) => {
    
    console.log('New Schedule:', newSchedule);
    setIsAddScheduleOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lettings</h1>
        <Button 
          className="bg-black hover:bg-black/90 text-white"
          onClick={() => setIsAddScheduleOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <StatsCards />
      <ViewingSchedules />
      <ViewingTable />

      <Dialog 
        open={isAddScheduleOpen} 
        onOpenChange={setIsAddScheduleOpen}
      >
        <DialogContent className="max-w-lg p-0">
          <AddSchedule 
            onClose={() => setIsAddScheduleOpen(false)}
            onAdd={handleAddSchedule}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 