import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
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
import { uploadBannerToCloudinary } from "./actions/upload-banner";
import { useBannerSearchHistory } from "./hooks/use-banner-search-history";
import { UnsplashReturnType } from "./types/unsplash-return-type";

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
    `https://avatar.vercel.sh/${id}`,
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
          type: "raw",
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
      const response = await uploadBannerToCloudinary({
        type: "url",
        data: url,
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

    onSuccess: (data) => {
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
          <ModalContent
            closeClassName="top-2 mt-3 mr-3  "
            className={cn(
              "h-32 w-full px-0 py-2",
              "flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5",
            )}
          >
            <ModalHeader className="contents space-y-0 text-left">
              <ModalTitle className="border-b border-border px-4 py-2 text-base">
                <Form {...form}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                        <FormItem className="relative flex w-full items-center">
                          <Input
                            placeholder="Search for an image"
                            {...field}
                            className="border-0 border-transparent pr-10 focus:border-transparent focus:ring-0"
                            onKeyDown={handleKeyDown}
                          />
                          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                            <Search className="mr-2 h-6 w-6 shrink-0 opacity-80" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </ModalTitle>
            </ModalHeader>

            <div className="h-32 overflow-y-auto px-4">
              <ModalDescription asChild>
                <Group heading="Search Results">
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="aspect-[4/3]">
                          <Skeleton className="h-16 w-full" />
                        </div>
                      ))
                    : searchResults?.map((image, index) => (
                        <div
                          key={index}
                          className="h-40 w-full overflow-hidden rounded-md"
                          onClick={() => {
                            handleSelectNewBanner(image.urls.regular);
                            setOpen(false);
                          }}
                        >
                          <Image
                            src={image.urls.regular}
                            alt={`Search result ${index}`}
                            width={120}
                            height={28}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                </Group>
              </ModalDescription>
              {page < totalPages && (
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="mt-4 w-full"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              )}
            </div>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

interface GroupProps {
  heading: string;
  children: React.ReactNode;
}

function Group({ heading, children }: GroupProps) {
  return (
    <div className="space-y-4">
      <div className="text-primary/90">
        <h2 className="text-sm font-medium text-muted-foreground">{heading}</h2>
      </div>
      <div className="h-42 grid grid-rows-2 gap-4">{children}</div>
    </div>
  );
}
