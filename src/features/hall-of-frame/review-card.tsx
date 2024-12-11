import { cn } from "@/lib/utils";
import Image from "next/image";

export function ReviewCard({
  name,
  avatar,
  value,
}: {
  name: string;
  avatar: string;
  value: string | null;
  isFavorite?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt={name}
          src={avatar}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">email</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{value}</blockquote>
    </figure>
  );
}
