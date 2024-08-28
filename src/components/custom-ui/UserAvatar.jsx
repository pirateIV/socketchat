import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center bg-cover rounded-full border-2 border-blue-500 bg-gray-100 dark:bg-gray-600",
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

const UserAvatar = React.forwardRef(
  (
    {
      username,
      connected,
      showConnection = true,
      size,
      fontSize,
      imgSrc,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(avatarVariants({ size, variant }))}
        ref={ref}
        {...props}
      >
        <div>
          {!imgSrc ? (
            <span
              className={cn(
                `${fontSize === "lg" ? "text-2xl" : "text-md"} flex-shrink-0`,
                "capitalize cursor-pointer font-medium text-gray-600 dark:text-gray-300",
              )}
            >
              {username.charAt(0)}
            </span>
          ) : (
            <img src={imgSrc} className="flex-shrink-0" alt={username} />
          )}
        </div>
        <span
          className={cn(
            "bottom-0 left-6 absolute w-3 h-3 border-2 border-[#5473f0] rounded-full",
            connected ? "bg-green-500" : "bg-red-500",
            showConnection ? "" : "hidden",
          )}
        ></span>
      </div>
    );
  },
);

export default UserAvatar;
