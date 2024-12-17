import * as React from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { ViewingDetails } from "./viewing-details"
import { ViewAllViewings } from "./view-all-viewings"

interface IViewing {
  id: string;
  name: string;
  agent: string;
  property: string;
  status: "confirmed" | "pending";
  outcome?: "visited" | "no show";
  time: string;
  actions?: {
    reschedule?: boolean;
    cancel?: boolean;
  };
}

interface IViewingSlot {
  readonly id: string;
  readonly time: string;
  readonly prospect: string;
  readonly email: string;
  readonly status: "confirmed" | "pending";
  readonly property: string;
}

interface ISlotSummary {
  readonly booked: number;
  readonly total: number;
}

interface IViewingSchedule {
  readonly id: string;
  readonly property: string;
  readonly unit?: string;
  readonly address: string;
  readonly date: string;
  readonly time: string;
  readonly agent: string;
  readonly status: "confirmed" | "pending";
  readonly slots: ISlotSummary;
}

interface IViewingScheduleCardProps {
  schedule: IViewingSchedule;
}

const VIEWING_SCHEDULES: ReadonlyArray<IViewingSchedule> = [
  {
    id: "1",
    property: "Wharnof Property",
    address: "Unit 3, 181 Industrial Avenue, London, UK",
    status: "confirmed",
    date: "Thursday, 15th of November, 2024",
    time: "2:00PM to 6:00PM",
    agent: "Debra Holt",
    slots: { booked: 6, total: 8 }
  },
  {
    id: "2",
    property: "Lucide Apartments",
    address: "Unit 9, 41 Oak Avenue, Manchester UK",
    status: "pending",
    date: "Friday 16th of November, 2024",
    time: "10:00PM to 6:00PM",
    agent: "Debra Holt",
    slots: { booked: 8, total: 8 }
  },
  {
    id: "3",
    property: "Verizon Property",
    address: "Unit 7, 32 Hemmings Avenue, London UK",
    status: "confirmed",
    date: "Monday 19th of November, 2024",
    time: "2:00PM to 6:00PM",
    agent: "Debra Holt",
    slots: { booked: 6, total: 8 }
  },
  {
    id: "4",
    property: "Skyline Towers",
    address: "Unit 12, 45 High Street, Birmingham, UK",
    status: "confirmed",
    date: "Tuesday 20th of November, 2024",
    time: "1:00PM to 5:00PM",
    agent: "Debra Holt",
    slots: { booked: 4, total: 8 }
  },
  {
    id: "5",
    property: "Marina Heights",
    address: "Unit 45, 23 Docklands Way, Liverpool, UK",
    status: "pending",
    date: "Wednesday 23rd of November, 2024",
    time: "9:00AM to 1:00PM",
    agent: "Debra Holt",
    slots: { booked: 3, total: 6 }
  },
  {
    id: "6",
    property: "The Pinnacle",
    address: "Unit 15, 89 Castle Street, Edinburgh, UK",
    status: "confirmed",
    date: "Thursday 24th of November, 2024",
    time: "1:00PM to 5:00PM",
    agent: "Debra Holt",
    slots: { booked: 7, total: 8 }
  },
  {
    id: "7",
    property: "Royal Gardens",
    address: "Unit 8, 12 Crown Avenue, Glasgow, UK",
    status: "confirmed",
    date: "Friday 25th of November, 2024",
    time: "11:00AM to 3:00PM",
    agent: "Debra Holt",
    slots: { booked: 5, total: 8 }
  },
  {
    id: "8",
    property: "City View Plaza",
    address: "Unit 92, 167 Urban Street, Cardiff, UK",
    status: "pending",
    date: "Monday 28th of November, 2024",
    time: "2:00PM to 6:00PM",
    agent: "Debra Holt",
    slots: { booked: 4, total: 6 }
  },
  {
    id: "9",
    property: "Riverside Towers",
    address: "Unit 33, 78 Thames Road, London, UK",
    status: "confirmed",
    date: "Tuesday 29th of November, 2024",
    time: "10:00AM to 2:00PM",
    agent: "Debra Holt",
    slots: { booked: 6, total: 8 }
  },
  {
    id: "10",
    property: "The Residence",
    address: "Unit 5, 45 Queen Street, Bristol, UK",
    status: "pending",
    date: "Wednesday 30th of November, 2024",
    time: "3:00PM to 7:00PM",
    agent: "Debra Holt",
    slots: { booked: 2, total: 6 }
  }
];

const mockViewingSlots: ReadonlyArray<IViewingSlot> = [
  {
    id: "1",
    time: "8:00 AM - 8:30 AM",
    prospect: "Olivia Rodriguez",
    email: "olivia@example.com",
    status: "confirmed",
    property: "Wharnof Property"
  },
  {
    id: "2",
    time: "8:30 AM - 9:00 AM",
    prospect: "Sophia Lee",
    email: "sophia@example.com",
    status: "pending",
    property: "Wharnof Property"
  },
  {
    id: "3",
    time: "9:00 AM - 9:30 AM",
    prospect: "Ethan Thompson",
    email: "ethan@example.com",
    status: "confirmed",
    property: "Wharnof Property"
  },
  {
    id: "4",
    time: "9:30 AM - 10:00 AM",
    prospect: "Olivia Rodriguez",
    email: "olivia@example.com",
    status: "pending",
    property: "Wharnof Property"
  }
];

function ViewingScheduleCard({ schedule }: IViewingScheduleCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const handleViewDetails = () => {
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card className="p-4 bg-white">
        <div className="flex justify-between items-start pb-3 mb-4 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-900">{schedule.property}</h3>
          <Badge 
            variant="secondary" 
            className={cn(
              "font-medium text-xs px-2 py-0.5 rounded",
              schedule.status === "confirmed" 
                ? "text-emerald-600 bg-emerald-50" 
                : "text-amber-600 bg-amber-50"
            )}
          >
            {schedule.status === "confirmed" ? "Felicity confirmed" : "Pending"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <span className="text-sm">{schedule.address}</span>
          </div>

          <div className="flex gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <span className="text-sm">{schedule.date}</span>
          </div>

          <div className="flex gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <span className="text-sm">{schedule.time}</span>
          </div>

          <div className="flex gap-2 text-gray-600">
            <Users className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <span className="text-sm">{schedule.slots.booked} of {schedule.slots.total} slots booked</span>
          </div>
        </div>

        <button 
          onClick={handleViewDetails}
          className="w-full mt-4 py-2 text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          View Details
        </button>
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
              slots: mockViewingSlots
            }}
            onClose={() => setIsDetailsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ViewingSchedules() {
  const [isViewingDetailsOpen, setIsViewingDetailsOpen] = React.useState(false);
  const [isAllViewingsVisible, setIsAllViewingsVisible] = React.useState(false);
  const [selectedViewing, setSelectedViewing] = React.useState<IViewingSchedule | null>(null);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleViewAll = (schedule: IViewingSchedule) => {
    setSelectedViewing(schedule);
    setIsViewingDetailsOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Viewing Schedules</h2>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-sm text-gray-500 hover:text-gray-900"
          onClick={() => setIsAllViewingsVisible(true)}
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

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

      <Dialog open={isAllViewingsVisible} onOpenChange={setIsAllViewingsVisible}>
        <DialogContent className="max-w-6xl p-0">
          <ViewAllViewings />
        </DialogContent>
      </Dialog>

      {selectedViewing && (
        <Dialog open={isViewingDetailsOpen} onOpenChange={setIsViewingDetailsOpen}>
          <DialogContent className="max-w-4xl">
            <ViewingDetails
              viewing={{
                id: selectedViewing.id,
                property: selectedViewing.property,
                address: selectedViewing.address,
                date: selectedViewing.date,
                time: selectedViewing.time,
                agent: selectedViewing.agent,
                slots: mockViewingSlots
              }}
              onClose={() => setIsViewingDetailsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
} 