import * as React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { Building2, CalendarDays, Clock, TimerOff } from "lucide-react"

export interface INewSchedule {
  readonly property: string;
  readonly unit: string;
  readonly isRecurring: boolean;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly slotDuration: "15" | "30";
}

interface IAddScheduleProps {
  readonly onClose: () => void;
  readonly onAdd: (schedule: INewSchedule) => void;
}

export function AddSchedule({ onClose, onAdd }: Readonly<IAddScheduleProps>) {
  const [schedule, setSchedule] = React.useState<INewSchedule>({
    property: "",
    unit: "",
    isRecurring: false,
    date: "",
    startTime: "",
    endTime: "",
    slotDuration: "15"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(schedule);
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-6">Add Schedule</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-gray-400" />
            <Select 
              value={schedule.property}
              onValueChange={(value) => setSchedule(prev => ({ ...prev, property: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wharnof">Wharnof Property</SelectItem>
                <SelectItem value="lucide">Lucide Apartments</SelectItem>
                <SelectItem value="verizon">Verizon Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-gray-400" />
            <Select 
              value={schedule.unit}
              onValueChange={(value) => setSchedule(prev => ({ ...prev, unit: value }))}
              disabled={!schedule.property}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a property first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unit1">Unit 1</SelectItem>
                <SelectItem value="unit2">Unit 2</SelectItem>
                <SelectItem value="unit3">Unit 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TimerOff className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Set a recurring schedule every week</span>
            </div>
            <Switch 
              checked={schedule.isRecurring}
              onCheckedChange={(checked) => setSchedule(prev => ({ ...prev, isRecurring: checked }))}
            />
          </div>

          <div className="flex items-center gap-4">
            <CalendarDays className="h-5 w-5 text-gray-400" />
            <Input 
              type="date"
              value={schedule.date}
              onChange={(e) => setSchedule(prev => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2 flex-1">
              <Input 
                type="time"
                value={schedule.startTime}
                onChange={(e) => setSchedule(prev => ({ ...prev, startTime: e.target.value }))}
              />
              <span className="text-gray-400">-</span>
              <Input 
                type="time"
                value={schedule.endTime}
                onChange={(e) => setSchedule(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-gray-400" />
            <div className="flex gap-2">
              <Button
                type="button"
                variant={schedule.slotDuration === "15" ? "default" : "outline"}
                onClick={() => setSchedule(prev => ({ ...prev, slotDuration: "15" }))}
              >
                15 Minutes
              </Button>
              <Button
                type="button"
                variant={schedule.slotDuration === "30" ? "default" : "outline"}
                onClick={() => setSchedule(prev => ({ ...prev, slotDuration: "30" }))}
              >
                30 Minutes
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Schedule
          </Button>
        </div>
      </form>
    </div>
  )
} 