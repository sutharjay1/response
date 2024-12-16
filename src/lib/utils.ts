import { successToast } from "@/features/global/toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const copyToClipboard = (text: string, message: string) => {
  navigator.clipboard.writeText(text).then(() => {
    successToast(message, {
      position: "top-center",
    });
  });
};
