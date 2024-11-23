import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  duration?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
};

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    description: options?.description,
    duration: options?.duration || 3000,
    position: options?.position || "bottom-right",
    style: {
      backgroundColor: "#E6FFFA", // Light green
      borderColor: "#38A169", // Green border
      color: "#2D3748", // Dark text
    },
    className: "border rounded-lg shadow-md",
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    description: options?.description,
    duration: options?.duration || 3000,
    position: options?.position || "bottom-right",
    style: {
      backgroundColor: "#FED7D7", // Light red
      borderColor: "#E53E3E", // Red border
      color: "#2D3748", // Dark text
    },
    className: "border rounded-lg shadow-md",
  });
};

export const infoToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    description: options?.description,
    duration: options?.duration || 3000,
    position: options?.position || "bottom-right",
    style: {
      backgroundColor: "#BEE3F8", // Light blue
      borderColor: "#3182CE", // Blue border
      color: "#2D3748", // Dark text
    },
    className: "border rounded-lg shadow-md",
  });
};
