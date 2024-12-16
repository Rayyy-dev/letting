import * as React from "react"
import { Button } from "../components/ui/button"
import { StatsCards } from "../components/letting/stats-cards"
import { ViewingSchedules } from "../components/letting/viewing-schedules"
import { ViewingTable } from "../components/letting/viewing-table"
import { Plus } from "lucide-react"

export function LettingPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-gray-950">Lettings</h1>
        <Button 
          className="bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white shadow-lg rounded-md px-4 py-2 h-auto"
          size="sm"
        >
          <Plus className="mr-2 h-3.5 w-3.5" />
          Add Schedule
        </Button>
      </div>

      <StatsCards />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Viewing Schedules</h2>
        </div>
        <ViewingSchedules />
      </div>

      <ViewingTable />
    </div>
  )
} 