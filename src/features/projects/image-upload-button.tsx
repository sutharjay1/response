"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CloudUpload, File, SpinnerOne, X } from "@mynaui/icons-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { errorToast, successToast } from "../global/toast";
import { uploadToCloudinary } from "./actions/upload-image";
import { FormElement } from "./types";
import Hint from "../global/hint";

interface ImageUploadDropZoneProps {
  handleChange?: (id: string, key: string, value: string) => void;
  id?: string;
  setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

export const ImageUploadDropZone: React.FC<ImageUploadDropZoneProps> = ({
  handleChange,
  id,
  setFormElements,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

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

        const response = await uploadToCloudinary(
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

          if (handleChange && response.data) {
            handleChange(id!, "value", response.data.secure_url!);
          }
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
    [handleChange, id, setFormElements],
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

  return (
    <Hint label="Attach reference image" side="top" align="center">
      <Card className="w-full">
        <CardContent
          className={cn(
            "w-full cursor-pointer rounded-lg border border-dashed border-[#7c533a]",
            acceptedFiles[0] ? "p-2" : "p-6",
          )}
        >
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
              <div className="flex flex-col items-center justify-center text-center">
                <CloudUpload className="mb-1 h-24 w-24 text-muted-foreground" />

                <p className="mb-2 text-lg font-semibold">
                  Drag & drop or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Image (Up to 4MB)
                </p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <SpinnerOne className="h-4 w-4 animate-spin" />
                {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Hint>
  );
};
