import { TSmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ReviewCard({
  img,
  name,
  username,
  body,
  className,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <TSmall className="text-xs font-medium dark:text-white/40">
            {username}
          </TSmall>
        </div>
      </div>
      <blockquote className="mt-2 text-left text-sm">{body}</blockquote>
    </figure>
  );
}
