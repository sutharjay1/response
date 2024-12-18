/* eslint-disable @next/next/no-img-element */
"use client";

import { cn, copyToClipboard } from "@/lib/utils";
import { LinkTwo } from "@mynaui/icons-react";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
  projectUrl?: string;
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
  projectUrl,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.length > 0
        ? avatarUrls
            .slice(0, 3)
            .map((url, index) => (
              <img
                key={index}
                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                src={url.imageUrl}
                width={40}
                height={40}
                alt={`Avatar ${index + 1}`}
              />
            ))
        : projectUrl && (
            <span
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-primary bg-gradient-to-br from-[#37322f] to-[#201e1d] text-center text-xs font-medium text-white dark:text-black"
              onClick={() => copyToClipboard(projectUrl, "Copied")}
            >
              <LinkTwo />
            </span>
          )}

      {(numPeople ?? 0) > 0 && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary bg-gradient-to-br from-[#37322f] to-[#201e1d] text-center text-xs font-medium text-white dark:text-black">
          +{numPeople}
        </span>
      )}
    </div>
  );
};

export { AvatarCircles };
