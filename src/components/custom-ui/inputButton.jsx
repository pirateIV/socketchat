import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputIconVariants = cva(
  "inline-flex items-center justify-center text-sm text-white hover:bg-gray-300/40 p-1 rounded-md",
  {
    variants: {
      variant: {},
    },
    defaultVariants: {},
  },
);

const InputIcon = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(inputIconVariants({ className }))}
      ref={ref}
      {...props}
    >
      <span className="sr-only">{props.title}</span>
    </button>
  );
});

export default InputIcon;
