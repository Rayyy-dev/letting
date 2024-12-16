import * as React from "react"
import { StatsCards } from "../../components/letting/stats-cards"
import { ViewingSchedules } from "../../components/letting/viewing-schedules"
import { ViewingTable } from "../../components/letting/viewing-table"
import { Button } from "../../components/ui/button"
import { Plus, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "../../components/ui/dialog"
import { ViewAllViewings } from "../components/letting/view-all-viewings"

export function LettingPage() {
  const [showAllViewings, setShowAllViewings] = React.useState(false)

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lettings</h1>
        <Button className="bg-black hover:bg-black/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <StatsCards />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Viewing Schedules</h2>
          <Button 
            variant="ghost" 
            className="text-sm text-gray-500 hover:text-gray-900"
            onClick={() => setShowAllViewings(true)}
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <ViewingSchedules />
      </div>

      <ViewingTable />

      <Dialog open={showAllViewings} onOpenChange={setShowAllViewings}>
        <DialogContent className="max-w-6xl">
          <ViewAllViewings onClose={() => setShowAllViewings(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
} 