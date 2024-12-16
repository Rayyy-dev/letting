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

interface IViewingScheduleCardProps {
  schedule: IViewingSchedule;
}

const VIEWING_SCHEDULES: IViewingSchedule[] = [
  {
    id: "1",
    property: "Wharnof Property",
    address: "Unit 3, 181 Industrial Avenue, London, UK",
    status: "confirmed",
    date: "Thursday, 15th of November, 2024",
    time: "2:00PM to 6:00PM",
    slots: { booked: 6, total: 8 }
  },
  // ... other mock data
];

function ViewingScheduleCard({ schedule: { property, address, status, date, time, slots } }: IViewingScheduleCardProps) {
  return (
    <Card className="p-6 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <h3 className="font-medium text-gray-900">{property}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-1.5 h-4 w-4 text-sky-500" />
              {address}
            </div>
          </div>
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
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-500">
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
          className="w-full text-gray-600 hover:text-gray-900"
        >
          View Details
        </Button>
      </div>
    </Card>
  )
}

export function ViewingSchedules() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
      >
        {VIEWING_SCHEDULES.map((schedule) => (
          <div key={schedule.id} className="w-[320px] flex-none">
            <ViewingScheduleCard schedule={schedule} />
          </div>
        ))}
      </div>
      <button
        onClick={handleScrollNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        aria-label="View more schedules"
      >
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
} 