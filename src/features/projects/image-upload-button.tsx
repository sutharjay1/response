"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Cloud, File, SpinnerOne } from "@mynaui/icons-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "./actions/upload-image";
import { FormElement } from "./types";
import { errorToast, successToast } from "../global/toast";

const ImageUploadDropZone = ({
  handleChange,
  id,
  setFormElements,
  setIsOpen,
}: {
  handleChange?: (id: string, key: string, value: string) => void;
  id?: string;
  setFormElements?: Dispatch<SetStateAction<FormElement[]>>;
  setIsOpen?: (v: boolean) => void;
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

        const response = await uploadToCloudinary(formData, id!.toString());

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

          if (setIsOpen) {
            setIsOpen(false);
          }

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
    [handleChange, id, setFormElements, setIsOpen],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
    },
    maxSize: 4 * 1024 * 1024,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className="mx-1 my-2 rounded-lg border border-dashed border-[#7c533a] bg-background p-2 md:h-96"
    >
      <div className="flex h-full w-full items-center justify-center p-2">
        <label
          htmlFor="dropzone-file"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-zinc-50 hover:bg-zinc-100"
        >
          <div className="flex select-none flex-col items-center justify-center space-y-2 pb-6 pt-5">
            <Cloud className="mb-2 h-10 w-10 text-zinc-400" />
            <p className="mb-2 text-sm text-zinc-700">
              <span>Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-zinc-500">Image (Up to 4MB)</p>
          </div>
          <input {...getInputProps()} />

          {acceptedFiles[0] && (
            <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
              <div className="grid h-full place-items-center px-3 py-2">
                <File className="h-4 w-4 text-primary" />
              </div>
              <div className="truncate px-3 py-2 text-sm">
                {acceptedFiles[0].name}
              </div>
            </div>
          )}

          {isUploading && (
            <>
              <div className="mx-auto mt-4 w-full max-w-xs">
                <Progress
                  value={uploadProgress}
                  className="h-1 w-full bg-zinc-200"
                  indicatorColor={
                    uploadProgress === 100 ? "bg-green-500" : "bg-primary"
                  }
                />
              </div>
              {uploadProgress >= 90 && (
                <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                  <SpinnerOne className="h-3 w-3 animate-spin" />
                  Processing...
                </div>
              )}
            </>
          )}
        </label>
      </div>
    </div>
  );
};

const ImageUploadButton = ({
  className,
  handleChange,
  id,
  setFormElements,
}: {
  className?: string;
  handleChange?: (id: string, key: string, value: string | boolean) => void;
  id?: string;
  setFormElements?: Dispatch<SetStateAction<FormElement[]>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "mb-4 flex max-w-fit items-center justify-center space-x-2",
            className,
          )}
        >
          Upload Image
        </Button>
      </ModalTrigger>
      <ModalContent className="h-fit lg:h-96">
        <ModalHeader>
          <ModalTitle>Upload Image</ModalTitle>
          <ModalDescription>
            <p className="text-muted-foreground">
              Upload an image for your field.
            </p>
          </ModalDescription>
        </ModalHeader>
        <ImageUploadDropZone
          handleChange={handleChange}
          id={id}
          setFormElements={setFormElements}
          setIsOpen={setIsOpen}
        />
      </ModalContent>
    </Modal>
  );
};

export { ImageUploadButton };
