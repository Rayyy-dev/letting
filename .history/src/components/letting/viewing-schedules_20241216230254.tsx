import * as React from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Switch } from "../ui/switch"

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
  const [isEnabled, setIsEnabled] = React.useState(false)

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium border-b border-gray-200 pb-1 text-gray-900">{property}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-1 h-4 w-4 text-sky-500" />
              {address}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant="outline"
              className={cn(
                "capitalize font-normal",
                status === "confirmed" 
                  ? "border-emerald-500 text-emerald-600 bg-emerald-50" 
                  : "border-amber-500 text-amber-600 bg-amber-50"
              )}
            >
              {status === "confirmed" ? "Felicity confirmed" : "Pending"}
            </Badge>
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              className="data-[state=checked]:bg-sky-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-sky-500" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-sky-500" />
            {time}
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-sky-500" />
            {slots.booked} of {slots.total} slots booked
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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