"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Video } from "@mynaui/icons-react";
import React, { useCallback, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { toast } from "sonner";
import { useVideo } from "../submit/hooks/use-video";
import { uploadToCloudinary } from "./actions/upload-image";
import { FormElement } from "./types";

interface VideoUploadFieldProps {
  id?: string;
  value?: string;
  setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
  onChange?: (value: string) => void;
}

export const VideoUploadButton: React.FC<VideoUploadFieldProps> = ({
  id,
  setFormElements,
  onChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const { videoUrl, setVideoUrl } = useVideo();

  const handleVideoUpload = useCallback(
    async (mediaBlobUrl: string) => {
      if (!mediaBlobUrl || !id) return;

      try {
        setIsUploading(true);

        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();

        const maxSize = 10 * 1024 * 1024;
        if (blob.size > maxSize) {
          toast.error("Video is too large. Max size is 10MB.");
          return null;
        }

        const file = new File([blob], "recorded-video.webm", {
          type: blob.type,
        });

        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await uploadToCloudinary(
          formData,
          id.toString(),
          "video",
        );

        if (uploadResponse.success && uploadResponse.data) {
          const videoUrl = uploadResponse.data.secure_url;

          setVideoUrl(videoUrl);
          setUploadedVideoUrl(videoUrl);

          if (typeof setFormElements === "function") {
            setFormElements((prevElements) =>
              prevElements.map((element) =>
                element.id === id ? { ...element, value: videoUrl } : element,
              ),
            );
          }

          if (onChange) {
            onChange(videoUrl);
          }

          toast.success("Video uploaded and saved successfully");
          return videoUrl;
        } else {
          throw new Error(uploadResponse.error || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Video upload failed");
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [id, setFormElements, setVideoUrl, onChange],
  );

  return (
    <Card className="w-full max-w-md">
      <CardContent
        className={cn(
          "cursor-pointer border-8 border-dashed border-[#7c533a] p-6",
        )}
      >
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            if (mediaBlobUrl && !stopRecording) {
              handleVideoUpload(mediaBlobUrl);
            }

            return (
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex flex-col items-center justify-center text-center">
                  <Video className="mb-1 h-24 w-24 text-muted-foreground" />
                  <p className="mb-2 text-lg font-semibold">Record a video</p>
                  <p className="text-sm text-muted-foreground">
                    {status === "idle"
                      ? "Click to start recording"
                      : status === "recording"
                        ? "Recording in progress"
                        : "Video recorded"}
                  </p>
                </div>

                <div className="flex space-x-4">
                  {status === "idle" && (
                    <Button
                      type="button"
                      onClick={startRecording}
                      variant="outline"
                    >
                      Start Recording
                    </Button>
                  )}

                  {status === "recording" && (
                    <Button
                      type="button"
                      onClick={stopRecording}
                      variant="destructive"
                    >
                      Stop Recording
                    </Button>
                  )}
                </div>

                {videoUrl && (
                  <div className="mt-4 flex w-full flex-col items-center">
                    <video
                      src={videoUrl}
                      controls
                      className="mb-4 w-full max-w-xs rounded-lg"
                    />
                  </div>
                )}

                {mediaBlobUrl && (
                  <div className="mt-4 flex w-full flex-col items-center">
                    <video
                      src={mediaBlobUrl}
                      controls
                      className="mb-4 w-full max-w-xs rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={() => handleVideoUpload(mediaBlobUrl!)}
                      disabled={isUploading}
                      variant="default"
                    >
                      {isUploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  </div>
                )}

                {uploadedVideoUrl && (
                  <p className="mt-2 text-sm text-green-600">
                    Video uploaded successfully
                  </p>
                )}
              </div>
            );
          }}
        />
      </CardContent>
    </Card>
  );
};
