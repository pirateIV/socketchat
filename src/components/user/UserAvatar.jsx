import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden bg-cover rounded-full border-2 border-blue-500 bg-gray-100 dark:bg-gray-600",
  {
    variants: {
      size: {
        default: "w-10 h-10",
        lg: "w-16 h-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const UserAvatar = React.forwardRef(({ name, imgSrc, size, fontSize }, ref) => {
  return (
    <div className={cn(avatarVariants({ size }))} ref={ref}>
      {!imgSrc ? (
        <span
          className={twMerge([
            `${fontSize === "lg" ? "text-2xl" : "text-md"}`,
            "flex-shrink-0 font-medium text-gray-600 dark:text-gray-300",
          ])}
        >
          {name.charAt(0)}
        </span>
      ) : (
        <img src={imgSrc} className="flex-shrink-0" alt={name} />
      )}
    </div>
  );
});

export default UserAvatar;
