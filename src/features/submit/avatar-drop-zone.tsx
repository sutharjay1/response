"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { File, PlusSquare, X } from "@mynaui/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { errorToast, successToast } from "../global/toast";
import { FormElement } from "../projects/types";
import { uploadSubmitAvatarToCloudinary } from "./actions/upload-image";

interface ImageUploadDropZoneProps {
  onAvatarChange: (avatar: string) => void;
  id?: string;
  setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

export const AvatarDropZone: React.FC<ImageUploadDropZoneProps> = ({
  onAvatarChange,
  id,
  setFormElements,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [, setUploadProgress] = useState<number>(0);
  const [currentImage] = useState<string>(
    `https://avatar.vercel.sh/${id}+${Date.now()}`,
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

        if (response.success) {
          clearInterval(progressInterval);
          setUploadProgress(100);
          successToast("Image uploaded successfully");
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
    [id, setFormElements],
  );

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
      },
      maxSize: 4 * 1024 * 1024,
      disabled: isUploading,
    });

  const removeFile = () => {
    acceptedFiles[0].slice();
  };

  useEffect(() => {
    if (currentImage) {
      onAvatarChange(currentImage);
    }
  }, [currentImage, onAvatarChange]);

  return (
    <Card className="w-fit">
      <CardContent className={cn("w-full cursor-pointer p-0")}>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center rounded-lg transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:bg-muted/10"
          }`}
        >
          <input {...getInputProps()} />
          {acceptedFiles[0] ? (
            <div className="flex w-full items-center justify-start space-x-4">
              <div className="relative w-fit overflow-hidden rounded-lg border transition-all">
                <Image
                  src={URL.createObjectURL(acceptedFiles[0])}
                  alt="Uploaded image"
                  width={50}
                  height={50}
                  className="rounded-md border border-input object-cover shadow"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <File className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">{acceptedFiles[0].name}</span>
                </div>
                <span>
                  {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-black/10">
                {currentImage && (
                  <Image
                    src={currentImage}
                    className="h-full w-full border border-input object-cover shadow"
                    width={80}
                    height={80}
                    alt="Profile image"
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute flex size-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-sidebar hover:bg-transparent hover:opacity-0"
                  aria-label="Change profile picture"
                >
                  <PlusSquare size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
                <input
                  type="file"
                  className="hidden border border-input shadow"
                  accept="image/*"
                  aria-label="Upload profile picture"
                />
              </div>
            </>
          )}
        </div>

        {/* {isUploading && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="h-2 w-full" />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <SpinnerOne className="h-4 w-4 animate-spin" />
              {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};
