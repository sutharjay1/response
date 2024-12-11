"use client";

import { Marquee } from "@/components/ui/marquee";
import { MobileScreen } from "@/components/ui/mobile";
import { errorToast } from "@/features/global/toast";
import { getHallOfFrame } from "@/features/hall-of-frame/actions/get-hall-of-frame";
import { ReviewCard } from "@/features/hall-of-frame/review-card";
import { Browser } from "@/features/root/browser";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const HallOfFrame = ({ params }: Props) => {
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    params.then((data) => {
      setProjectId(data.projectId);
    });
  }, [params]);

  const { data } = useQuery({
    queryKey: ["hallOfFrame", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return getHallOfFrame({ projectId });
    },
    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(projectId),
  });

  const firstRow = data?.slice(0, data?.length / 2);
  const secondRow = data?.slice(data?.length / 2);

  return (
    <div className="relative mx-auto flex w-full flex-col items-center overflow-y-auto pb-12 sm:rounded-lg">
      <div className="flex w-full items-center justify-between space-x-4 px-4 py-2">
        <Browser className="mx-auto h-[28rem] w-full max-w-6xl">
          <section className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-b-xl border-x border-b">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow?.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow?.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
          </section>
        </Browser>
      </div>
      <MobileScreen />
    </div>
  );
};

export default HallOfFrame;
