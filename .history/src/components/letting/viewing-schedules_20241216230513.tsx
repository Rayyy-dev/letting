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
  },
  {
    id: "4",
    property: "Skyline Towers",
    address: "Unit 12, 45 High Street, Birmingham, UK",
    status: "confirmed",
    date: "Tuesday 20th of November, 2024",
    time: "1:00PM to 5:00PM",
    slots: { booked: 4, total: 8 }
  },
  {
    id: "5",
    property: "The Residence",
    address: "Unit 8, 92 Park Lane, Leeds, UK",
    status: "pending",
    date: "Wednesday 21st of November, 2024",
    time: "11:00AM to 3:00PM",
    slots: { booked: 3, total: 6 }
  },
  {
    id: "6",
    property: "Urban Living",
    address: "Unit 15, 78 City Road, Manchester, UK",
    status: "confirmed",
    date: "Thursday 22nd of November, 2024",
    time: "3:00PM to 7:00PM",
    slots: { booked: 5, total: 8 }
  }
];

interface IViewingScheduleCardProps {
  schedule: IViewingSchedule;
}

function ViewingScheduleCard({ schedule: { property, address, status, date, time, slots } }: IViewingScheduleCardProps) {
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
          <div className="flex items-center gap-2">
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
            <ChevronRight className="h-4 w-4 text-gray-400" />
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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MOCK_SCHEDULES.map((schedule) => (
          <div key={schedule.id} className="min-w-[400px]">
            <ViewingScheduleCard schedule={schedule} />
          </div>
        ))}
      </div>
      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
      >
        <ChevronRight className="h-6 w-6 text-gray-400" />
      </button>
    </div>
  );
} 