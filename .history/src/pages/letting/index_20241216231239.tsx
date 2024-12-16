import * as React from "react"
import { StatsCards } from "../../components/letting/stats-cards"
import { ViewingSchedules } from "../../components/letting/viewing-schedules"
import { ViewingTable } from "../../components/letting/viewing-table"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"

export function LettingPage() {
  const [selectedViewingId, setSelectedViewingId] = React.useState<string | null>(null);

  const handleViewingSelect = (id: string) => {
    setSelectedViewingId(id);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lettings</h1>
        <Button className="bg-black hover:bg-black/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <StatsCards />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Viewing Schedules</h2>
        <ViewingSchedules onViewingSelect={handleViewingSelect} />
      </div>

      <div className="space-y-4">
        <ViewingTable />
      </div>
    </div>
  )
} 