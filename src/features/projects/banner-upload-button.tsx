import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Search, SpinnerOne } from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { errorToast, successToast } from "../global/toast";
import { FormElement } from "../projects/types";
import { getUnsplashImage } from "./actions/get-unsplash-image";
import { uploadBannerToCloudinary } from "./actions/upload-banner-raw";
import { useBannerSearchHistory } from "./hooks/use-banner-search-history";
import { UnsplashReturnType } from "./types/unsplash-return-type";
import { uploadUnsplashBanner } from "./actions/upload-banner-url";

interface BannerUploadDropZoneProps {
  onAvatarChange: (avatar: string) => void;
  id?: string;
  setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
  banner: string;
}

const unsplashImageSearchSchema = z.object({ query: z.string() });

type TUnsplashImageSearch = z.infer<typeof unsplashImageSearchSchema>;

export const BannerUploadDropZone: React.FC<BannerUploadDropZoneProps> = ({
  banner,
  onAvatarChange,
  id,
  setFormElements,
}) => {
  const { setBannerSearchHistory } = useBannerSearchHistory();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(
    "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQ2MTh8MHwxfHNlYXJjaHwzfHxhcnR8ZW58MHx8fHwxNzMzODUwNTI2fDA&ixlib=rb-4.0.3&q=80&w=1080",
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const form = useForm<TUnsplashImageSearch>({
    resolver: zodResolver(unsplashImageSearchSchema),
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    if (banner) {
      setCurrentImage(banner);
    }
  }, [banner]);

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

        const response = await uploadBannerToCloudinary({
          data: formData,
          id: id as string,
        });

        if (setFormElements) {
          setFormElements((prevElements) =>
            prevElements.map((element) =>
              element.id === id
                ? { ...element, value: response.data?.secure_url as string }
                : element,
            ),
          );
        }

        if (response.success && response.data) {
          clearInterval(progressInterval);
          setUploadProgress(100);
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

  useEffect(() => {
    if (banner && onAvatarChange) {
      onAvatarChange(banner);
    }
  }, [banner, onAvatarChange]);

  const handleSelectNewBanner = async (url: string) => {
    setIsUploading(true);
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) =>
        prevProgress >= 95 ? prevProgress : prevProgress + 5,
      );
    }, 500);

    try {
      const response = await uploadUnsplashBanner({
        url,
        id: id as string,
      });

      if (setFormElements) {
        setFormElements((prevElements) =>
          prevElements.map((element) =>
            element.id === id
              ? { ...element, value: response.data?.banner as string }
              : element,
          ),
        );
      }

      if (response.success && response.data) {
        clearInterval(progressInterval);
        setUploadProgress(100);
        onAvatarChange(response.data.banner as string);
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
  };

  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<UnsplashReturnType[]>([]);

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["unsplash-image"],
    mutationFn: async ({ query }: TUnsplashImageSearch) => {
      if (!query.trim()) {
        throw new Error("Search query cannot be empty");
      }
      return getUnsplashImage(query, page);
    },
    onSuccess: async (data) => {
      if (data && data.success && Array.isArray(data.results)) {
        const newResults =
          page === 1 ? data.results : [...searchResults, ...data.results];

        setSearchResults(newResults);
        setTotalPages(data.total_pages || 1);

        setBannerSearchHistory({
          query: form.getValues("query"),
          data: newResults,
        });
      } else {
        errorToast("No image found", { position: "top-center" });
      }
    },
  });

  const handleLoadMore = async () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);

      try {
        await mutateAsync({ query: form.getValues("query") });
      } catch (err) {
        errorToast(
          err instanceof Error ? err.message : "Something went wrong",
          { position: "top-center" },
        );
      }
    }
  };

  const handleSearch = async () => {
    const currentQuery = form.getValues("query");

    if (!currentQuery.trim()) {
      errorToast("Please type something", { position: "top-center" });
      return;
    }

    setPage(1);
    setSearchResults([]);

    try {
      await mutateAsync({ query: currentQuery });
    } catch (err) {
      errorToast(err instanceof Error ? err.message : "Something went wrong", {
        position: "top-center",
      });
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  useEffect(() => {
    if (!open && searchResults.length > 0) {
      setSearchResults([]);
      form.reset();
    }
  }, [open, searchResults, form]);

  return (
    <div className="relative h-40 w-full">
      {isUploading ? (
        <CardContent
          className={cn(
            "relative m-3 mb-4 flex h-40 w-full cursor-pointer items-center justify-center bg-background p-3",
            "rounded-lg border-2 border-dashed border-primary",
          )}
        >
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="h-2 w-full" />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <SpinnerOne className="h-4 w-4 animate-spin" />
              {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
            </div>
          </div>
        </CardContent>
      ) : (
        <div
          {...getRootProps()}
          className={`flex w-full flex-col items-center justify-center rounded-lg transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:bg-muted/10"
          }`}
        >
          <div className="relative flex h-40 w-full overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-primary/20">
            {currentImage && (
              <Image
                src={currentImage}
                alt="card cover"
                fill
                className="h-full w-full object-cover"
              />
            )}
            <Button
              variant="outline"
              size="icon"
              className="absolute m-2 bg-sidebar font-normal"
            >
              <input
                type="file"
                className="hidden border border-input shadow"
                accept="image/*"
                aria-label="Upload profile picture"
                {...getInputProps()}
              />
              <Pencil />
            </Button>
          </div>
        </div>
      )}

      <>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
          className="absolute right-0 top-0 m-2 bg-sidebar font-normal"
        >
          <Image
            src={
              "https://res.cloudinary.com/cdn-feedback/image/upload/v1733747539/response/icon-unsplash.svg"
            }
            alt="unsplash"
            width={20}
            height={20}
          />
        </Button>

        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent className="h-[32rem] max-w-3xl gap-0 p-0">
            <ModalHeader className="p-4 pb-2">
              <ModalTitle>Search Images</ModalTitle>
            </ModalHeader>

            <div className="border-t p-4">
              <div className="relative">
                <Form {...form}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-center">
                          <Input
                            placeholder="Search for an image"
                            {...field}
                            className="border-0 border-transparent pl-8 pr-10 font-aeonik font-medium text-primary placeholder:pl-4 focus:border-transparent focus:ring-0"
                            onKeyDown={handleKeyDown}
                          />
                          <Search className="absolute top-0 ml-1 mt-0 h-6 w-6 text-muted-foreground" />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>

            <ScrollArea className="h-64 border-t">
              {isLoading && (
                <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                    >
                      <Skeleton className="absolute inset-0" />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-3">
                {searchResults.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleSelectNewBanner(image.urls.regular);
                      setOpen(false);
                    }}
                    className="group relative aspect-square overflow-hidden rounded-lg border bg-muted outline-none transition-colors hover:border-accent-foreground/20 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <Image
                      src={image.urls.regular}
                      alt={`Search result ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="rounded-full bg-black/50 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Select Image
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex w-full items-center justify-center pb-3">
                {page < totalPages && searchResults.length > 0 && (
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="mt-4 w-fit px-6"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </Button>
                )}
              </div>
            </ScrollArea>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
