"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { generateEmbeddedFile } from "@/features/analytics/actions/generate-embedded-file";
import { errorToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { useGenerateFile } from "@/hooks/use-generate-file";
import { useProject } from "@/hooks/use-project";
import { useUser } from "@/hooks/use-user";
import {
  At,
  Infinity,
  InfoWaves,
  MoveHorizontalSolid,
  MoveVerticalSolid,
} from "@mynaui/icons-react";
import { useQuery } from "@tanstack/react-query";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { copyToClipboard } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type LayoutType = "horizontal" | "vertical" | "infinite-scroll";

const layoutTypeItems = [
  {
    type: "horizontal",
    title: "Horizontal",
    description: "Spread your content across the page width",
    icon: (
      <MoveHorizontalSolid
        className="opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    ),
  },
  {
    type: "vertical",
    title: "Vertical",
    description: "Arrange content in a single, scrollable column",
    icon: (
      <MoveVerticalSolid
        className="opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    ),
  },
  {
    type: "infinite-scroll",
    title: "Infinite Scroll",
    description: "Continuously load more content as you scroll",
    icon: (
      <Infinity
        className="opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    ),
  },
] as const;

const ProjectAnalyticsInfo = () => {
  const { project } = useProject();
  const { user } = useUser();

  const [layoutType, setLayoutType] = useState<LayoutType>("horizontal");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setIsScriptGenerated } = useGenerateFile();

  const { isLoading, isInitialLoading } = useQuery({
    queryKey: ["projectFields", project?.id],
    queryFn: async () => {
      if (!project?.id) {
        throw new Error("Project ID is required");
      }
      return getProjectAnalytics(project?.id);
    },

    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(project?.id),
  });

  const handleGenerateScript = (type: LayoutType) => {
    switch (type) {
      case "horizontal": {
        generateEmbeddedFile(project?.id as string).then((filePath) => {
          if (filePath) {
            setIsScriptGenerated(true);
            setIsModalOpen(true);
          } else {
            setIsModalOpen(true);
          }
        });
        break;
      }
    }
  };

  if (isLoading || isInitialLoading) {
    return (
      <div className="space-y-6">
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <At
                className="h-6 w-6 font-semibold text-white"
                strokeWidth={2}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="font-medium text-primary">{project?.id}</div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex items-center justify-start space-x-2">
                  <Badge
                    icon={<InfoWaves className="h-4 w-4" />}
                    variant="default"
                    className="border border-input text-sm font-medium"
                  >
                    Certified
                  </Badge>
                  <div className="flex items-center gap-2 rounded-3xl border border-input px-1 pr-1.5 font-medium text-primary">
                    <Avatar className="h-5 w-5 rounded-xl">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="rounded-xl px-3 py-2">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-normal">{user?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() =>
                copyToClipboard(
                  project?.scriptFile as string,
                  "Script URL Copied",
                )
              }
            >
              Copy Script URL
            </Button>
            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
              <ModalTrigger asChild>
                <Button variant="outline">Generate Embedded File ✨</Button>
              </ModalTrigger>

              <ModalContent className="lg:max-w-[60rem]">
                <ModalHeader>
                  <ModalTitle className="text-xl font-bold">
                    Generate Embedded File
                  </ModalTitle>
                  <ModalDescription className="text-muted-foreground">
                    Choose a layout type for your embedded file generation
                  </ModalDescription>
                </ModalHeader>

                <div className="mx-auto mt-4 w-full max-w-5xl md:mt-0">
                  <RadioGroup
                    value={layoutType}
                    onValueChange={(value) =>
                      setLayoutType(value as LayoutType)
                    }
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  >
                    {layoutTypeItems.map((layout) => (
                      <Card
                        key={layout.title}
                        className={`relative cursor-pointer overflow-hidden border transition-all hover:bg-input/10 ${
                          layoutType === layout.type
                            ? "border border-input bg-input/15"
                            : "border-input"
                        }`}
                      >
                        <div className="p-2">
                          <Image
                            src={"https://avatar.vercel.sh/" + user?.name}
                            alt={layout.title}
                            width={382}
                            height={216}
                            className="h-32 w-full rounded-lg object-cover grayscale-[50%] transition-all group-hover:grayscale-0"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="mb-2 text-lg font-bold text-primary">
                            {layout.title} Layout
                          </h3>
                          <p className="mb-4 text-sm text-muted-foreground">
                            {layout.description}
                          </p>
                          <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-input px-3 py-2 text-center shadow-sm transition-colors">
                            <RadioGroupItem
                              value={layout.type}
                              id={layout.type}
                              className="sr-only"
                            />
                            <Label
                              htmlFor={layout.type}
                              className={`cursor-pointer ${
                                layoutType === layout.type
                                  ? "font-semibold text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {layoutType === layout.type
                                ? "Selected"
                                : "Select"}{" "}
                              {layout.title}
                            </Label>
                          </label>
                        </div>
                      </Card>
                    ))}
                  </RadioGroup>
                </div>

                <ModalFooter className="mt-4 md:mt-0">
                  <Button
                    variant="default"
                    className="w-full md:w-fit"
                    onClick={() => handleGenerateScript(layoutType)}
                  >
                    Generate Embedded File
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProjectAnalyticsInfo;
