import * as React from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Dialog, DialogContent } from "../ui/dialog"
import { ViewingDetails } from "./viewing-details"

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
  onSelect?: () => void;
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
  {
    id: "2",
    property: "Lucide Apartments",
    address: "Unit 9, 41 Oak Avenue, Manchester UK",
    status: "pending",
    date: "Friday 16th of November, 2024",
    time: "10:00PM to 6:00PM",
    slots: { booked: 8, total: 8 }
  },
  {
    id: "3",
    property: "Verizon Property",
    address: "Unit 7, 32 Hemmings Avenue, London UK",
    status: "confirmed",
    date: "Monday 19th of November, 2024",
    time: "2:00PM to 6:00PM",
    slots: { booked: 6, total: 8 }
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
    property: "Marina Heights",
    address: "Unit 45, 23 Docklands Way, Liverpool, UK",
    status: "pending",
    date: "Wednesday 23rd of November, 2024",
    time: "9:00AM to 1:00PM",
    slots: { booked: 3, total: 6 }
  },
  {
    id: "6",
    property: "The Pinnacle",
    address: "Unit 15, 89 Castle Street, Edinburgh, UK",
    status: "confirmed",
    date: "Thursday 24th of November, 2024",
    time: "1:00PM to 5:00PM",
    slots: { booked: 7, total: 8 }
  },
  {
    id: "7",
    property: "Royal Gardens",
    address: "Unit 8, 12 Crown Avenue, Glasgow, UK",
    status: "confirmed",
    date: "Friday 25th of November, 2024",
    time: "11:00AM to 3:00PM",
    slots: { booked: 5, total: 8 }
  },
  {
    id: "8",
    property: "City View Plaza",
    address: "Unit 92, 167 Urban Street, Cardiff, UK",
    status: "pending",
    date: "Monday 28th of November, 2024",
    time: "2:00PM to 6:00PM",
    slots: { booked: 4, total: 6 }
  },
  {
    id: "9",
    property: "Riverside Towers",
    address: "Unit 33, 78 Thames Road, London, UK",
    status: "confirmed",
    date: "Tuesday 29th of November, 2024",
    time: "10:00AM to 2:00PM",
    slots: { booked: 6, total: 8 }
  },
  {
    id: "10",
    property: "The Residence",
    address: "Unit 5, 45 Queen Street, Bristol, UK",
    status: "pending",
    date: "Wednesday 30th of November, 2024",
    time: "3:00PM to 7:00PM",
    slots: { booked: 2, total: 6 }
  }
];

function ViewingScheduleCard({ schedule, onSelect }: IViewingScheduleCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const handleViewDetails = () => {
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card className="p-6 bg-white rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{schedule.property}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
                {schedule.address}
              </div>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                "font-normal px-3 py-1",
                schedule.status === "confirmed" 
                  ? "text-emerald-600 bg-emerald-50" 
                  : "text-amber-600 bg-amber-50"
              )}
            >
              {schedule.status === "confirmed" ? "Felicity confirmed" : "Pending"}
            </Badge>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
              {schedule.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
              {schedule.time}
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0" />
              {schedule.slots.booked} of {schedule.slots.total} slots booked
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full text-gray-600 hover:bg-gray-50 font-normal"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <ViewingDetails 
            viewing={{
              id: schedule.id,
              property: schedule.property,
              address: schedule.address,
              date: schedule.date,
              time: schedule.time,
              agent: "Debra Holt",
              slots: [
                {
                  id: "1",
                  time: "8:00 AM - 8:30 AM",
                  prospect: "Olivia Rodriguez",
                  email: "olivia@example.com",
                  status: "confirmed"
                },
                {
                  id: "2",
                  time: "8:30 AM - 9:00 AM",
                  prospect: "Sophia Lee",
                  email: "sophia@example.com",
                  status: "pending"
                },
                {
                  id: "3",
                  time: "9:00 AM - 9:30 AM",
                  prospect: "Ethan Thompson",
                  email: "ethan@example.com",
                  status: "confirmed"
                },
                {
                  id: "4",
                  time: "9:30 AM - 10:00 AM",
                  prospect: "Olivia Rodriguez",
                  email: "olivia@example.com",
                  status: "pending"
                }
              ]
            }}
            onClose={() => setIsDetailsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

interface IViewingSchedulesProps {
  onViewingSelect?: (id: string) => void;
}

export function ViewingSchedules({ onViewingSelect }: IViewingSchedulesProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {VIEWING_SCHEDULES.map((schedule) => (
          <div key={schedule.id} className="w-[340px] flex-none first:ml-0">
            <ViewingScheduleCard schedule={schedule} />
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg">
        <button
          onClick={handleScrollNext}
          className="p-3 hover:bg-gray-50"
          aria-label="View more schedules"
        >
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
} 