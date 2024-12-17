import * as React from "react"
import { Badge } from "../ui/badge"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  UserCircle, 
  X,
  ChevronLeft,
  ChevronRight 
} from "lucide-react"
import { cn } from "../../lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarPicker } from "../../components/ui/calendar"
import { Button } from "../../components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { AddManualViewing } from "./add-manual-viewing"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { TimeSelector } from "./time-selector"
import { IManualViewingData } from "./add-manual-viewing"

interface ITimeState {
  readonly start: {
    readonly hours: string;
    readonly minutes: string;
  };
  readonly end: {
    readonly hours: string;
    readonly minutes: string;
  };
}

interface IViewingSlot {
  readonly id: string;
  readonly time: string;
  readonly prospect: string;
  readonly email: string;
  readonly status: "confirmed" | "pending";
  readonly outcome?: "visited" | "no show";
}

interface IViewingDetails {
  readonly id: string;
  readonly property: string;
  readonly address: string;
  readonly date: string;
  readonly time: string;
  readonly agent: string;
  readonly slots: ReadonlyArray<IViewingSlot>;
}

interface IViewingDetailsProps {
  readonly viewing: IViewingDetails;
  readonly onClose: () => void;
}

interface IConflictingSlot {
  readonly id: string;
  readonly time: string;
  readonly prospect: string;
}

interface IScheduleConflict {
  readonly id: string;
  readonly prospect: string;
  readonly time: string;
}

const filterConflictingSlots = (slots: readonly IViewingSlot[], startTime: string, endTime: string) => {
  return slots.filter(slot => {
    const [slotStart] = slot.time.split(" - ");
    const [slotHours, slotMinutes] = slotStart.split(":");
    const slotTimeStr = `${slotHours.padStart(2, '0')}:${slotMinutes}`;
    
    return slotTimeStr >= endTime || slotTimeStr < startTime;
  });
};

const filterNonConflictingSlots = (slots: readonly IViewingSlot[], conflictIds: readonly IConflictingSlot[]) => {
  return slots.filter(slot => !conflictIds.find(conflict => conflict.id === slot.id));
};

const generateSecureId = (): string => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(36);
};

export function ViewingDetails({ viewing, onClose }: Readonly<IViewingDetailsProps>) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [slots, setSlots] = React.useState<readonly IViewingSlot[]>([...viewing.slots]);

  // Display time state (non-editable)
  const [displayStartTime] = React.useState("14:00");
  const [displayEndTime] = React.useState("18:00");

  // Editable time state
  const [timeRange, setTimeRange] = React.useState<Readonly<ITimeState>>({
    start: {
      hours: "14",
      minutes: "00"
    },
    end: {
      hours: "18",
      minutes: "00"
    }
  });

  const [isAddManualVisible, setIsAddManualVisible] = React.useState(false);
  const [showConflictDialog, setShowConflictDialog] = React.useState(false);
  const [conflictingSlots, setConflictingSlots] = React.useState<IConflictingSlot[]>([]);
  const [scheduleConflicts, setScheduleConflicts] = React.useState<IScheduleConflict[]>([]);
  const [showScheduleDialog, setShowScheduleDialog] = React.useState(false);

  const availableTimeSlots = [
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00"
  ];

  const [assignedAgent, setAssignedAgent] = React.useState(viewing.agent);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsDatePickerOpen(false);
    }
  };

  const handleTimeChange = (type: "start" | "end", field: "hours" | "minutes", value: string) => {
    const newTime = {
      ...timeRange,
      [type]: { ...timeRange[type], [field]: value }
    };
    
    const newStartTime = `${newTime.start.hours}:${newTime.start.minutes}`;
    const newEndTime = `${newTime.end.hours}:${newTime.end.minutes}`;
    
    if (newEndTime <= newStartTime) {
      return;
    }
    
    const conflicts = filterConflictingSlots(slots, newStartTime, newEndTime);
    
    if (conflicts.length > 0) {
      setConflictingSlots(conflicts);
      setShowConflictDialog(true);
      return;
    }

    setTimeRange(newTime);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    const newStartTime = `${timeRange.start.hours}:${timeRange.start.minutes}`;
    const newEndTime = `${timeRange.end.hours}:${timeRange.end.minutes}`;
    
    if (newEndTime <= newStartTime) return;

    const conflicts = filterConflictingSlots(slots, newStartTime, newEndTime);

    if (conflicts.length > 0) {
      const conflictData = conflicts.map(slot => ({
        id: slot.id,
        prospect: slot.prospect,
        time: slot.time
      }));
      setScheduleConflicts(conflictData);
      setShowScheduleDialog(true);
      return;
    }

    handleConfirmSave();
  };

  const formatTime = (time: ITimeState["start"]) => {
    return `${time.hours}:${time.minutes}`;
  };

  const adjustSlotTime = (slotTime: string, newRange: ITimeState) => {
    // Adjust slot times based on new schedule range
    // Implementation depends on business logic
    return slotTime;
  };

  const handleConfirmSave = () => {
    setIsEditing(false);
    setShowScheduleDialog(false);
  };

  const handleAddManualViewing = (data: IManualViewingData) => {
    const newSlot: IViewingSlot = {
      id: generateSecureId(),
      time: data.timeSlot,
      prospect: data.name,
      email: data.email,
      status: "pending"
    };
    setSlots(prev => [...prev, newSlot]);
  };

  const handleCancelConflictingViewings = () => {
    const updatedSlots = filterNonConflictingSlots(slots, conflictingSlots);
    setSlots(updatedSlots);
    setShowConflictDialog(false);
  };

  const handleCancelAppointments = () => {
    // Remove conflicting appointments
    setSlots(prev => prev.filter(slot => 
      !scheduleConflicts.find(conflict => conflict.id === slot.id)
    ));
    handleConfirmSave();
  };

  const handleReschedule = () => {
    // Close dialog and keep editing mode on
    setShowScheduleDialog(false);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-medium">
            Viewing Schedules
          </h2>
          <span className="text-[22px] text-gray-500">: <span className="font-bold text-black">Wharf Property - Unit 3</span></span>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="text-sm h-9 px-4"
                onClick={() => setIsEditing(false)}
              >
                Cancel
                <X className="ml-2 h-4 w-4" />
              </Button>
              <Button
                className="bg-black text-white hover:bg-black/90 text-sm h-9 px-4"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="text-sm h-9 px-4"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <div className="flex items-center text-gray-600">
          <MapPin className="mr-3 h-4 w-4 text-blue-500/90 flex-shrink-0" />
          <span className="text-sm">181 Industrial Avenue, London, SW20 3XR</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="mr-3 h-4 w-4 text-blue-500/90 flex-shrink-0" />
          <Popover open={isDatePickerOpen && isEditing} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <button 
                className={cn(
                  "bg-white border border-gray-200 rounded-md px-3 py-1.5 w-[240px] text-sm text-left",
                  "hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                  !isEditing && "cursor-default opacity-80"
                )}
                disabled={!isEditing}
                onClick={() => isEditing && setIsDatePickerOpen(true)}
              >
                {format(selectedDate, "EEEE dd MMMM yyyy")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className="rounded-md border-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="mr-3 h-4 w-4 text-blue-500/90 flex-shrink-0" />
          <div className="flex items-center gap-2">
            {isEditing ? (
              <TimeSelector
                startTime={timeRange.start}
                endTime={timeRange.end}
                onTimeChange={handleTimeChange}
              />
            ) : (
              <span className="text-sm">
                {timeRange.start.hours}:{timeRange.start.minutes} to {timeRange.end.hours}:{timeRange.end.minutes}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <UserCircle className="mr-3 h-4 w-4 text-blue-500/90 flex-shrink-0" />
          <Select
            value={assignedAgent}
            onValueChange={setAssignedAgent}
            disabled={!isEditing}
          >
            <SelectTrigger className="w-[240px] h-9 border-gray-200">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Debra Holt">Debra Holt</SelectItem>
              <SelectItem value="John Smith">John Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="bg-gray-50/80 p-0.5 rounded-md">
          <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded border border-gray-100/80">
            <div className="flex gap-1">
              <div className="w-[3px] h-8 bg-blue-500/90 rounded-full" />
              <div className="w-[3px] h-8 bg-blue-500/90 rounded-full" />
            </div>
            <span className="text-gray-600 text-sm">
              Available slots: <span className="font-medium text-gray-900">2</span>
            </span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:border-gray-300 text-sm h-9 px-4"
          onClick={() => setIsAddManualVisible(true)}
        >
          Add Manual Viewing
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-[80px] font-medium">SNo</TableHead>
              <TableHead className="font-medium">Time</TableHead>
              <TableHead className="font-medium">Prospect</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right pr-6">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.map((slot, index) => (
              <TableRow key={slot.id} className="hover:bg-gray-50/50">
                <TableCell className="text-gray-900 font-medium">{index + 1}</TableCell>
                <TableCell className="text-gray-900 font-medium">{slot.time}</TableCell>
                <TableCell className="text-gray-900 font-medium">{slot.prospect}</TableCell>
                <TableCell className="text-gray-900 font-medium">{slot.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={slot.status === "confirmed" ? "success" : "default"}
                    className={cn(
                      "rounded-md font-normal",
                      slot.status === "confirmed" 
                        ? "bg-green-50 text-green-700 hover:bg-green-50"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {slot.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select defaultValue={slot.outcome}>
                    <SelectTrigger 
                      className="w-[160px] h-9 border-gray-200 justify-between"
                      disabled={!isEditing}
                    >
                      <SelectValue placeholder="Select Outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visited">Visited</SelectItem>
                      <SelectItem value="no show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Rows per page</span>
          <Select
            value="10"
            onValueChange={() => {}}
          >
            <SelectTrigger className="h-8 w-[65px] border-0 bg-transparent text-sm text-gray-600">
              <SelectValue>10</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Page 1 of 1</span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
              disabled
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AddManualViewing
        isOpen={isAddManualVisible}
        onClose={() => setIsAddManualVisible(false)}
        onSubmit={handleAddManualViewing}
        availableSlots={availableTimeSlots}
      />

      {/* Conflict Dialog */}
      <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
        <DialogContent className="max-w-[500px] p-6">
          <DialogHeader>
            <DialogTitle>Schedule Conflict</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              The following viewings conflict with the new schedule:
            </p>
            <ul className="space-y-2">
              {conflictingSlots.map(slot => (
                <li key={slot.id} className="text-sm">
                  {slot.prospect} at {slot.time}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConflictDialog(false)}
            >
              Cancel Changes
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConflictingViewings}
            >
              Cancel Conflicting Viewings
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Change Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-[500px] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Confirm Schedule Change
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-2">
              This change will affect {scheduleConflicts.length} existing appointment(s):
            </p>
            <ul className="space-y-2 mb-4">
              {scheduleConflicts.map(conflict => (
                <li key={conflict.id} className="text-sm text-gray-600">
                  • {conflict.prospect} - {conflict.time}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              What would you like to do with these appointments?
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="text-sm h-9 px-4"
              onClick={() => setShowScheduleDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="text-sm h-9 px-4 bg-black text-white hover:bg-black/90"
              onClick={handleCancelAppointments}
            >
              Cancel Appointments
            </Button>
            <Button
              variant="outline"
              className="text-sm h-9 px-4 bg-black text-white hover:bg-black/90"
              onClick={handleReschedule}
            >
              Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 