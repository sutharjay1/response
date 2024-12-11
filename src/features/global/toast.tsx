import { cn } from "@/lib/utils";
import {
  Bell,
  CheckWaves,
  Copy,
  DangerTriangle,
  DangerWaves,
  InfoWaves,
  SpinnerOne,
} from "@mynaui/icons-react";
import { toast } from "sonner";

type marginSide = "left" | "right" | "top" | "bottom";

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
  margin?: {
    [key in marginSide]?: string;
  };
};

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION = "top-center";

export const successToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
  toast.success(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <CheckWaves className="h-5 w-5 font-bold" size={16} strokeWidth={1.08} />
    ),
    style: {
      backgroundColor: "#004014",
      color: "#56eda1",
      border: "none",
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className: cn(
      "rounded-xl shadow-lg flex items-center gap-2 py-2 text-sm font-medium",
    ),
  });
};

export const loadingToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
  const toastId = toast.loading(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <SpinnerOne
        className="h-5 w-5 font-semibold text-[#0e0d0c]"
        size={16}
        strokeWidth={1.08}
        color="#0e0d0c"
      />
    ),
    style: {
      backgroundColor: "#f7f7f7",
      color: "#0e0d0c",
      border: "none",
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });

  return {
    id: toastId,
    dismissToast: function () {
      toast.dismiss(this.id);
    },
  };
};

export const errorToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
  toast.error(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <DangerWaves className="h-5 w-5 font-bold" size={16} strokeWidth={1.08} />
    ),
    style: {
      backgroundColor: "#500000",
      color: "#ED5555",
      border: "none",
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const infoToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <InfoWaves
        className="h-5 w-5 font-semibold"
        size={16}
        strokeWidth={1.08}
      />
    ),
    style: {
      backgroundColor: "#4338ca",
      color: "#a5b4fc",
      border: "none",
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const warningToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
  toast(message, {
    description: options?.description,
    duration: options?.duration || DEFAULT_DURATION,
    position: options?.position || DEFAULT_POSITION,
    icon: (
      <DangerTriangle
        className="h-5 w-5 font-semibold"
        size={16}
        strokeWidth={1.08}
      />
    ),
    style: {
      backgroundColor: "rgb(245, 158, 11)",
      color: "white",
      border: "none",
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const copyToast = (
  message: string = "Copied to clipboard",
  options?: ToastOptions,
) => {
  const isMobile = window.innerWidth <= 768;
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
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};

export const notificationToast = (message: string, options?: ToastOptions) => {
  const isMobile = window.innerWidth <= 768;
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
      marginLeft: isMobile ? undefined : options?.margin?.left || "8rem",
    },
    className:
      "rounded-xl py-2 shadow-lg flex items-center gap-2 text-sm font-medium",
  });
};
