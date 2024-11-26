import { toast } from "sonner";
import { X, Info, AlertCircle, Copy, Bell } from "lucide-react";
import { GoCheckCircleFill } from "react-icons/go";

type ToastOptions = {
  description?: string;
  duration?: number;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-center";
};

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION = "bottom-right";

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <GoCheckCircleFill
        className="h-5 w-5 font-bold"
        size={16}
        strokeWidth={1.08}
      />
    ),
    style: {
      backgroundColor: "#004014",
      color: "#56eda1",
      border: "none",
    },
    className:
      "rounded-xl shadow-lg flex items-center gap-2 py-2 text-sm font-medium",
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: <X className="h-5 w-5 font-bold" size={16} strokeWidth={1.08} />,
    style: {
      backgroundColor: "#500000",
      color: "#ED5555",
      border: "none",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const infoToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <Info className="h-5 w-5 font-semibold" size={16} strokeWidth={1.08} />
    ),
    style: {
      backgroundColor: "rgb(59, 130, 246)",
      color: "white",
      border: "none",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const warningToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <AlertCircle
        className="h-5 w-5 font-semibold"
        size={16}
        strokeWidth={1.08}
      />
    ),
    style: {
      backgroundColor: "rgb(245, 158, 11)",
      color: "white",
      border: "none",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const copyToast = (
  message: string = "Copied to clipboard",
  options?: ToastOptions,
) => {
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <Copy className="h-5 w-5 font-semibold" size={16} strokeWidth={1.08} />
    ),
    style: {
      backgroundColor: "rgb(17, 24, 39)",
      color: "white",
      border: "none",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const notificationToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <Bell className="h-5 w-5 font-semibold" size={16} strokeWidth={1.08} />
    ),
    style: {
      backgroundColor: "rgb(88, 28, 135)",
      color: "white",
      border: "none",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};
