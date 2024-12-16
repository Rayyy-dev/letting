import * as React from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface IViewingSchedule {
  id: string;
  property: string;
  address: string;
  status: "confirmed" | "pending";
  date: string;
  time: string;
  slots: {
    booked: number;
    total: number;
  };
}

function ViewingScheduleCard({ schedule }: { schedule: IViewingSchedule }) {
  const handleViewDetailsClick = () => {
    // Handle view details click
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{schedule.property}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-1 h-4 w-4" />
              {schedule.address}
            </div>
          </div>
          <Badge 
            variant="outline"
            className={cn(
              "capitalize",
              schedule.status === "confirmed" 
                ? "border-green-500 text-green-500" 
                : "border-yellow-500 text-yellow-500"
            )}
          >
            {schedule.status}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {schedule.date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {schedule.time}
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {schedule.slots.booked} of {schedule.slots.total} slots booked
          </div>
        </div>

        <Button variant="outline" className="w-full">
          View Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

export function ViewingSchedules() {
  const schedules: IViewingSchedule[] = [
    {
      id: "1",
      property: "Wharnof Property",
      address: "Unit 3, 181 Industrial Avenue, London, UK",
      status: "confirmed",
      date: "Thursday, 15th of November, 2024",
      time: "2:00PM to 6:00PM",
      slots: {
        booked: 6,
        total: 8
      }
    },
    {
      id: "2",
      property: "Lucide Apartments",
      address: "Unit 9, 41 Oak Avenue, Manchester UK",
      status: "pending",
      date: "Friday 16th of November, 2024",
      time: "10:00PM to 6:00PM",
      slots: {
        booked: 8,
        total: 8
      }
    },
    {
      id: "3",
      property: "Verizon Property",
      address: "Unit 7, 32 Hemmings Avenue, London UK",
      status: "confirmed",
      date: "Monday 19th of November, 2024",
      time: "2:00PM to 6:00PM",
      slots: {
        booked: 6,
        total: 8
      }
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map((schedule) => (
        <ViewingScheduleCard key={schedule.id} schedule={schedule} />
      ))}
    </div>
  )
} 