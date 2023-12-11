import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <span className="w-fit h-4 text-black text-center text-xs absolute left-0 top-2">
      {props.min}x
    </span>
    <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <span className="text-black text-xs absolute right-0 top-2">
      {props.max}x
    </span>
    <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full bg-white border-2 border-[#262626] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
      <div className="flex w-fit items-center gap-1 text-black absolute left-1/2 -top-6 h-4 -translate-x-1/2 text-center text-xs">
        Leverage{" "}
        <span className="text-base">
          {props.value !== undefined ? props.value[0] ?? 0 : 0}x
        </span>
      </div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
