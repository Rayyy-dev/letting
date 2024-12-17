import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface ITimeSelectorProps {
  readonly startTime: {
    readonly hours: string;
    readonly minutes: string;
  };
  readonly endTime: {
    readonly hours: string;
    readonly minutes: string;
  };
  readonly onTimeChange: (type: "start" | "end", field: "hours" | "minutes", value: string) => void;
}

export function TimeSelector({ startTime, endTime, onTimeChange }: Readonly<ITimeSelectorProps>) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Select 
          value={startTime.hours}
          onValueChange={(val) => onTimeChange("start", "hours", val)}
        >
          <SelectTrigger className="w-[72px] h-9 px-2.5 border-gray-200">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => 
              <SelectItem key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select 
          value={startTime.minutes}
          onValueChange={(val) => onTimeChange("start", "minutes", val)}
        >
          <SelectTrigger className="w-[72px] h-9 px-2.5 border-gray-200">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {["00", "30"].map(minute => 
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <span className="text-sm text-gray-500">to</span>
      <div className="flex items-center gap-1">
        <Select 
          value={endTime.hours}
          onValueChange={(val) => onTimeChange("end", "hours", val)}
        >
          <SelectTrigger className="w-[72px] h-9 px-2.5 border-gray-200">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => 
              <SelectItem key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select 
          value={endTime.minutes}
          onValueChange={(val) => onTimeChange("end", "minutes", val)}
        >
          <SelectTrigger className="w-[72px] h-9 px-2.5 border-gray-200">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {["00", "30"].map(minute => 
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 