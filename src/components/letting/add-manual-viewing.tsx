import * as React from "react"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface IAddManualViewingProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (data: IManualViewingData) => void;
  readonly availableSlots: ReadonlyArray<string>;
}

export interface IManualViewingData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly timeSlot: string;
}

export function AddManualViewing({ isOpen, onClose, onSubmit, availableSlots }: Readonly<IAddManualViewingProps>) {
  const [formData, setFormData] = React.useState<IManualViewingData>({
    name: "",
    email: "",
    phone: "",
    timeSlot: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-6">
        <DialogHeader className="mb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Add Manual Viewing
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="h-10 border-gray-200"
                placeholder="Enter prospect name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="h-10 border-gray-200"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="h-10 border-gray-200"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                Available Time Slots
              </label>
              <Select
                value={formData.timeSlot}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timeSlot: value }))}
                required
              >
                <SelectTrigger className="h-10 border-gray-200">
                  <SelectValue placeholder="Select an available time slot" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              type="submit"
              className="bg-black hover:bg-black/90 text-sm h-9 px-4"
            >
              Add Viewing
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 