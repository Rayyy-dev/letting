export interface ITimeSlot {
  readonly value: string;
  readonly label: string;
}

export interface IViewingTime {
  readonly hours: string;
  readonly minutes: string;
  readonly period: "AM" | "PM";
}

export const HOURS = Array.from({ length: 12 }, (_, i) => 
  (i + 1).toString().padStart(2, '0')
);

export const MINUTES = ["00", "15", "30", "45"];

export const TIME_SLOTS: ReadonlyArray<ITimeSlot> = HOURS.flatMap(hour => 
  MINUTES.map(minute => ({
    value: `${hour}:${minute}`,
    label: `${hour}:${minute}`
  }))
); 