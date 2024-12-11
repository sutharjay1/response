"use client";

import { CircularProgressBar } from "@/components/ellipse-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil } from "@mynaui/icons-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { errorToast, successToast } from "../global/toast";
import { FormElement } from "../projects/types";
import { uploadSubmitAvatarToCloudinary } from "./actions/upload-image";

interface AvatarDropZoneProps {
  onAvatarChange: (avatar: string) => void;
  id: string;
  setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

export const AvatarDropZone: React.FC<AvatarDropZoneProps> = ({
  onAvatarChange,
  id,
  setFormElements,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(
    `https://avatar.vercel.sh/${id}`,
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return errorToast("Invalid file type or size", {
          position: "top-center",
        });
      }

      const file = acceptedFiles[0];
      setIsUploading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) =>
          prevProgress >= 95 ? prevProgress : prevProgress + 5,
        );
      }, 500);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadSubmitAvatarToCloudinary(
          formData,
          id!.toString(),
          "image",
        );

        if (setFormElements && response.data) {
          setFormElements((prevElements) =>
            prevElements.map((element) =>
              element.id === id
                ? { ...element, value: response.data.secure_url! }
                : element,
            ),
          );
        }

        if (response.success && response.data) {
          clearInterval(progressInterval);
          setUploadProgress(100);

          setCurrentImage(response.data.secure_url as string);
          onAvatarChange(response.data.secure_url as string);
          successToast("Image uploaded successfully", {
            position: "top-center",
          });
        } else {
          throw new Error(response.error || "Upload failed");
        }
      } catch (error) {
        clearInterval(progressInterval);
        errorToast("Image upload failed", {
          position: "top-center",
        });
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [id, setFormElements, onAvatarChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
    },
    maxSize: 4 * 1024 * 1024,
    disabled: isUploading,
  });

  return (
    <Card className="w-fit">
      {isUploading ? (
        <div
          className={cn(
            "relative flex h-16 w-16 cursor-pointer items-center justify-center bg-background",
            "rounded-lg border-2 border-dashed border-primary",
          )}
        >
          <div className="space-y-2">
            <CircularProgressBar
              value={uploadProgress}
              max={100}
              min={0}
              gaugePrimaryColor="#f3f2f1"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="size-2 h-2 w-2"
            />
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex h-16 w-16 flex-col items-center justify-center rounded-lg transition-colors",
            isDragActive
              ? "border-2 border-dashed border-primary bg-primary/10"
              : "border-2 border-dashed border-muted-foreground/25 hover:bg-muted/10",
          )}
        >
          <div className="relative flex h-full w-full overflow-hidden rounded-lg bg-muted p-0.5">
            {currentImage && (
              <Image
                src={currentImage}
                alt="Avatar"
                fill
                className="object-cover"
              />
            )}
            <Button
              variant="outline"
              size="icon"
              className="absolute m-1 h-fit w-fit bg-sidebar p-1 font-normal"
            >
              <input
                type="file"
                className="hidden border border-input shadow"
                accept="image/*"
                aria-label="Upload profile picture"
                {...getInputProps()}
              />
              <Pencil className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
