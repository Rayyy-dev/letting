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

const MOCK_SCHEDULES: IViewingSchedule[] = [
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
];

interface IViewingScheduleCardProps {
  schedule: IViewingSchedule;
}

function ViewingScheduleCard({ schedule: { property, address, status, date, time, slots } }: IViewingScheduleCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{property}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4 text-blue-500" />
              {address}
            </div>
          </div>
          <Badge 
            variant="outline"
            className={cn(
              "capitalize",
              status === "confirmed" 
                ? "border-green-500 text-green-500" 
                : "border-yellow-500 text-yellow-500"
            )}
          >
            {status === "confirmed" ? "Felicity confirmed" : "Pending"}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-blue-500" />
            {time}
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-blue-500" />
            {slots.booked} of {slots.total} slots booked
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full text-gray-700 hover:text-gray-900"
        >
          View Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

export function ViewingSchedules() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_SCHEDULES.map((schedule) => (
        <ViewingScheduleCard key={schedule.id} schedule={schedule} />
      ))}
    </div>
  )
} 