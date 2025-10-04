import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface AllocationSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  className?: string;
}
export function AllocationSlider({ value, onValueChange, className }: AllocationSliderProps) {
  const handleSliderChange = (newValue: number[]) => {
    onValueChange(newValue[0]);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let numValue = parseInt(event.target.value, 10);
    if (isNaN(numValue)) {
      numValue = 0;
    }
    if (numValue < 0) {
      numValue = 0;
    }
    if (numValue > 100) {
      numValue = 100;
    }
    onValueChange(numValue);
  };
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        max={100}
        step={1}
        className="flex-1"
      />
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-20 text-center pr-6"
          min="0"
          max="100"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
      </div>
    </div>
  );
}