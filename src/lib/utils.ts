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

type PriceOptions = {
  price: number;
  options?: {
    notation: "compact" | "standard";
    currency: string;
  };
};

export const formatPrice = ({ price, options }: PriceOptions) => {
  const { currency = "INR", notation = "standard" } = options || {};

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation: numericPrice < 100000 ? undefined : notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};
