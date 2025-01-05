"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Microphone, Video } from "@mynaui/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { errorToast, successToast } from "../global/toast";
import { useVideo } from "./hooks/use-video";
import { uploadToCloudinary } from "../projects/actions/upload-image";
import { FormElement } from "../projects/types";

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
  const [permissionState, setPermissionState] = useState<{
    camera: boolean;
    microphone: boolean;
  }>({ camera: false, microphone: false });
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const { videoUrl, setVideoUrl } = useVideo();

  const checkPermission = async (type: "camera" | "microphone") => {
    try {
      const result = await navigator.permissions.query({
        name: type as PermissionName,
      });

      if (result.state === "granted") {
        setPermissionState((prev) => ({
          ...prev,
          [type]: true,
        }));
        return true;
      }

      const constraints = {
        audio: type === "microphone" ? true : false,
        video: type === "camera" ? true : false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      stream.getTracks().forEach((track) => track.stop());

      setPermissionState((prev) => ({
        ...prev,
        [type]: true,
      }));

      return true;
    } catch (error) {
      console.error(`${type} permission error:`, error);

      if (error instanceof DOMException) {
        switch (error.name) {
          case "NotAllowedError":
            errorToast(
              `${type} access was denied. Please allow access in your browser settings.`,
            );
            break;
          case "NotFoundError":
            errorToast(`No ${type} device found.`);
            break;
          default:
            errorToast(
              `Error accessing ${type}. Please check your device settings.`,
            );
        }
      }
      return false;
    }
  };

  const handleCameraPermissionRequest = async () => {
    const cameraGranted = await checkPermission("camera");
    if (cameraGranted) {
      successToast("Camera access granted");
      if (permissionState.microphone) {
        setShowPermissionPrompt(false);
      }
    }
  };

  const handleMicrophonePermissionRequest = async () => {
    const microphoneGranted = await checkPermission("microphone");
    if (microphoneGranted) {
      successToast("Microphone access granted");
      if (permissionState.camera) {
        setShowPermissionPrompt(false);
      }
    }
  };

  useEffect(() => {
    if (permissionState.camera && permissionState.microphone) {
      setShowPermissionPrompt(false);
    }
  }, [permissionState]);

  const handleVideoUpload = useCallback(
    async (mediaBlobUrl: string) => {
      if (!mediaBlobUrl || !id) return;

      try {
        setIsUploading(true);
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();

        const maxSize = 10 * 1024 * 1024;
        if (blob.size > maxSize) {
          errorToast("Video size exceeds the maximum limit of 10MB");
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

          if (setFormElements) {
            setFormElements((prevElements) =>
              prevElements.map((element) =>
                element.id === id ? { ...element, value: videoUrl } : element,
              ),
            );
          }

          if (onChange) {
            onChange(videoUrl);
          }

          successToast("Video uploaded successfully");
          return videoUrl;
        }
      } catch (error) {
        console.error("Upload error:", error);
        errorToast("Something went wrong. Please try again.");
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [id, setFormElements, setVideoUrl, onChange],
  );

  if (showPermissionPrompt) {
    return (
      <Card className="w-full">
        <CardContent
          className={cn(
            "m-1 rounded-lg border border-dashed border-[#7c533a]/50 p-6",
          )}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">
                Permission Required
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                To record video, we need access to your camera and microphone
              </p>
            </div>

            <div className="flex w-full max-w-xs flex-col space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Camera</span>
                </div>
                <div>
                  {permissionState.camera ? (
                    <span className="text-sm text-green-500">Granted</span>
                  ) : (
                    <Button
                      onClick={handleCameraPermissionRequest}
                      variant="default"
                      size="sm"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Request Access
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <div className="flex items-center space-x-2">
                  <Microphone className="h-5 w-5" />
                  <span>Microphone</span>
                </div>
                <div>
                  {permissionState.microphone ? (
                    <span className="text-sm text-green-500">Granted</span>
                  ) : (
                    <Button
                      onClick={handleMicrophonePermissionRequest}
                      variant="default"
                      size="sm"
                    >
                      <Microphone className="mr-2 h-4 w-4" />
                      Request Access
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent
        className={cn(
          "m-1 cursor-pointer rounded-lg border border-dashed border-[#7c533a]/50 p-6",
        )}
      >
        <ReactMediaRecorder
          video
          audio
          mediaRecorderOptions={{
            mimeType: "video/webm",
          }}
          askPermissionOnMount
          render={({
            status,
            startRecording,
            stopRecording,
            mediaBlobUrl,
            error,
          }) => {
            if (mediaBlobUrl) {
              handleVideoUpload(mediaBlobUrl);
            }

            if (error) {
              console.error(error);
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
                      onClick={() => handleVideoUpload(mediaBlobUrl)}
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
