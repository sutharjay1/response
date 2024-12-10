// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { cn } from "@/lib/utils";
// // import { EditOne, Pencil, SpinnerOne } from "@mynaui/icons-react";
// // import Image from "next/image";
// // import { useCallback, useEffect, useState } from "react";
// // import { useDropzone } from "react-dropzone";
// // import { errorToast, successToast } from "../global/toast";
// // import { FormElement } from "../projects/types";
// // import { uploadSubmitAvatarToCloudinary } from "./actions/upload-image";
// // import { Progress } from "@/components/ui/progress";

// // interface ImageUploadDropZoneProps {
// //   onAvatarChange: (avatar: string) => void;
// //   id?: string;
// //   setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
// // }

// // export const AvatarDropZone: React.FC<ImageUploadDropZoneProps> = ({
// //   onAvatarChange,
// //   id,
// //   setFormElements,
// // }) => {
// //   const [isUploading, setIsUploading] = useState<boolean>(false);
// //   const [uploadProgress, setUploadProgress] = useState<number>(0);
// //   const [currentImage, setCurrentImage] = useState<string>(
// //     `https://avatar.vercel.sh/${id}+${Date.now()}`,
// //   );

// //   const onDrop = useCallback(
// //     async (acceptedFiles: File[]) => {
// //       if (acceptedFiles.length === 0) {
// //         return errorToast("Invalid file type or size", {
// //           position: "top-center",
// //         });
// //       }

// //       const file = acceptedFiles[0];
// //       setIsUploading(true);
// //       setUploadProgress(0);

// //       const progressInterval = setInterval(() => {
// //         setUploadProgress((prevProgress) =>
// //           prevProgress >= 95 ? prevProgress : prevProgress + 5,
// //         );
// //       }, 500);

// //       try {
// //         const formData = new FormData();
// //         formData.append("file", file);

// //         const response = await uploadSubmitAvatarToCloudinary(
// //           formData,
// //           id!.toString(),
// //           "image",
// //         );

// //         if (setFormElements && response.data) {
// //           setFormElements((prevElements) =>
// //             prevElements.map((element) =>
// //               element.id === id
// //                 ? { ...element, value: response.data.secure_url! }
// //                 : element,
// //             ),
// //           );
// //         }

// //         if (response.success && response.data) {
// //           clearInterval(progressInterval);
// //           setUploadProgress(100);

// //           setCurrentImage(response.data.secure_url as string);
// //           onAvatarChange(response.data.secure_url as string);
// //           successToast("Image uploaded successfully", {
// //             position: "top-center",
// //           });
// //         } else {
// //           throw new Error(response.error || "Upload failed");
// //         }
// //       } catch (error) {
// //         clearInterval(progressInterval);
// //         errorToast("Image upload failed", {
// //           position: "top-center",
// //         });
// //         console.error("Upload error:", error);
// //       } finally {
// //         setIsUploading(false);
// //       }
// //     },
// //     [id, setFormElements, onAvatarChange],
// //   );

// //   const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
// //     useDropzone({
// //       onDrop,
// //       multiple: false,
// //       accept: {
// //         "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
// //       },
// //       maxSize: 4 * 1024 * 1024,
// //       disabled: isUploading,
// //     });

// //   useEffect(() => {
// //     if (currentImage && onAvatarChange) {
// //       onAvatarChange(currentImage);
// //     }
// //   }, [currentImage, onAvatarChange]);

// //   return (
// //     // <Card className="flex h-full w-fit items-center justify-center">
// //     //   <CardContent className={cn("w-full cursor-pointer p-0")}>
// //     //     <div
// //     //       {...getRootProps()}
// //     //       className={`flex flex-col items-center justify-center rounded-lg transition-colors ${
// //     //         isDragActive
// //     //           ? "border-primary bg-primary/10"
// //     //           : "border-muted-foreground/25 hover:bg-muted/10"
// //     //       }`}
// //     //     >
// //     //       <input {...getInputProps()} />
// //     //       {acceptedFiles[0] ? (
// //     //         <div className="flex w-full items-center justify-start space-x-4">
// //     //           <div className="relative flex h-20 w-20 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-black/10">
// //     //             <Image
// //     //               src={URL.createObjectURL(acceptedFiles[0])}
// //     //               alt="Uploaded image"
// //     //               width={80}
// //     //               height={80}
// //     //               className="rounded-md border border-input object-cover shadow"
// //     //             />
// //     //             {/* <Button
// //     //               variant="outline"
// //     //               size="icon"
// //     //               onClick={(e) => {
// //     //                 e.stopPropagation();
// //     //                 removeFile();
// //     //               }}
// //     //               className="flex size-12 cursor-pointer items-end justify-normal rounded-sm border-0 bg-transparent text-sidebar hover:bg-transparent hover:opacity-80"
// //     //               aria-label="Change profile picture"
// //     //             >
// //     //               <X
// //     //                 size={16}
// //     //                 strokeWidth={2}
// //     //                 aria-hidden="true"
// //     //                 className="absolute bottom-2 right-0 text-black"
// //     //               />
// //     //             </Button> */}
// //     //           </div>
// //     //         </div>
// //     //       ) : (
// //     //         <>
// //     //           <div className="relative flex h-20 w-20 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-black/10">
// //     //             {currentImage && (
// //     //               <Image
// //     //                 src={currentImage}
// //     //                 className="rounded-md border border-input object-cover shadow"
// //     //                 width={80}
// //     //                 height={80}
// //     //                 alt="Profile image"
// //     //               />
// //     //             )}
// //     //             <Button
// //     //               variant="outline"
// //     //               size="icon"
// //     //               className="absolute flex size-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-sidebar hover:bg-transparent"
// //     //               aria-label="Change profile picture"
// //     //             >
// //     //               <EditOne size={16} strokeWidth={2} aria-hidden="true" />
// //     //             </Button>
// //     //             <input
// //     //               type="file"
// //     //               className="hidden border border-input shadow"
// //     //               accept="image/*"
// //     //               aria-label="Upload profile picture"
// //     //             />
// //     //           </div>
// //     //         </>
// //     //       )}
// //     //     </div>

// //     //     {/* {isUploading && (
// //     //       <div className="mt-4 space-y-2">
// //     //         <Progress value={uploadProgress} className="h-2 w-full" />
// //     //         <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
// //     //           <SpinnerOne className="h-4 w-4 animate-spin" />
// //     //           {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
// //     //         </div>
// //     //       </div>
// //     //     )} */}
// //     //   </CardContent>
// //     // </Card>

// //     <div className="relative h-full w-fit">
// //     {isUploading ? (
// //       <CardContent
// //         className={cn(
// //           "relative m-3 mb-4 flex h-40 w-full cursor-pointer items-center justify-center bg-background p-3",
// //           "rounded-lg border-2 border-dashed border-primary",
// //         )}
// //       >
// //         <div className="mt-4 space-y-2">
// //           <Progress value={uploadProgress} className="h-2 w-full" />
// //           <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
// //             <SpinnerOne className="h-4 w-4 animate-spin" />
// //             {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
// //           </div>
// //         </div>
// //       </CardContent>
// //     ) : (
// //       <div
// //         {...getRootProps()}
// //         className={`flex w-full flex-col items-center justify-center rounded-lg transition-colors ${
// //           isDragActive
// //             ? "border-primary bg-primary/10"
// //             : "border-muted-foreground/25 hover:bg-muted/10"
// //         }`}
// //       >
// //         <div className="relative flex h-40 w-full overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-primary/20">
// //           {currentImage && (
// //             <Image
// //               src={currentImage}
// //               alt="card cover"
// //               fill
// //               className="h-full w-full object-cover"
// //             />
// //           )}
// //           <Button
// //             variant="outline"
// //             size="icon"
// //             className="absolute m-2 bg-sidebar font-normal"
// //           >
// //             <input
// //               type="file"
// //               className="hidden border border-input shadow"
// //               accept="image/*"
// //               aria-label="Upload profile picture"
// //               {...getInputProps()}
// //             />
// //             <Pencil />
// //           </Button>
// //         </div>
// //       </div>
// //     )}
// //     </div>

// //   );
// // };

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { Pencil, SpinnerOne } from "@mynaui/icons-react";
// import Image from "next/image";
// import { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { errorToast, successToast } from "../global/toast";
// import { FormElement } from "../projects/types";
// import { uploadSubmitAvatarToCloudinary } from "./actions/upload-image";
// import { Progress } from "@/components/ui/progress";

// interface AvatarDropZoneProps {
//   onAvatarChange: (avatar: string) => void;
//   id: string;
//   setFormElements?: React.Dispatch<React.SetStateAction<FormElement[]>>;
// }

// export const AvatarDropZone: React.FC<AvatarDropZoneProps> = ({
//   onAvatarChange,
//   id,
//   setFormElements,
// }) => {
//   console.log("projectId", id);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [currentImage, setCurrentImage] = useState<string>(
//     `https://avatar.vercel.sh/${id}`,
//   );

//   const onDrop = useCallback(
//     async (acceptedFiles: File[]) => {
//       if (acceptedFiles.length === 0) {
//         return errorToast("Invalid file type or size", {
//           position: "top-center",
//         });
//       }

//       const file = acceptedFiles[0];
//       setIsUploading(true);
//       setUploadProgress(0);

//       const progressInterval = setInterval(() => {
//         setUploadProgress((prevProgress) =>
//           prevProgress >= 95 ? prevProgress : prevProgress + 5,
//         );
//       }, 500);

//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await uploadSubmitAvatarToCloudinary(
//           formData,
//           id!.toString(),
//           "image",
//         );

//         if (setFormElements && response.data) {
//           setFormElements((prevElements) =>
//             prevElements.map((element) =>
//               element.id === id
//                 ? { ...element, value: response.data.secure_url! }
//                 : element,
//             ),
//           );
//         }

//         if (response.success && response.data) {
//           clearInterval(progressInterval);
//           setUploadProgress(100);

//           setCurrentImage(response.data.secure_url as string);
//           onAvatarChange(response.data.secure_url as string);
//           successToast("Image uploaded successfully", {
//             position: "top-center",
//           });
//         } else {
//           throw new Error(response.error || "Upload failed");
//         }
//       } catch (error) {
//         clearInterval(progressInterval);
//         errorToast("Image upload failed", {
//           position: "top-center",
//         });
//         console.error("Upload error:", error);
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [id, setFormElements, onAvatarChange],
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: false,
//     accept: {
//       "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
//     },
//     maxSize: 4 * 1024 * 1024,
//     disabled: isUploading,
//   });

//   // useEffect(() => {
//   //   if (currentImage && onAvatarChange) {
//   //     onAvatarChange(currentImage);
//   //   }
//   // }, [currentImage, onAvatarChange]);

//   console.log({
//     currentImage,
//   })

//   return (
//     <>
//       {isUploading ? (
//         <CardContent
//           className={cn(
//             "relative m-3 mb-4 flex h-28 w-full cursor-pointer items-center justify-center bg-background p-3",
//             "rounded-lg border-2 border-dashed border-primary",
//           )}
//         >
//           <div className="mt-4 space-y-2">
//             <Progress value={uploadProgress} className="h-2 w-full" />
//             <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
//               <SpinnerOne className="h-4 w-4 animate-spin" />
//               {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
//             </div>
//           </div>
//         </CardContent>
//       ) : (
//         <div
//           {...getRootProps()}
//           className={`flex w-full flex-col items-center justify-center rounded-lg transition-colors ${
//             isDragActive
//               ? "border-primary bg-primary/10"
//               : "border-muted-foreground/25 hover:bg-muted/10"
//           }`}
//         >
//           <div className="relative flex h-28 w-full overflow-hidden rounded-xl border-4 border-background bg-muted shadow-sm shadow-primary/20">
//             {currentImage && (
//               <Image
//                 src={currentImage}
//                 alt="card cover"
//                 fill
//                 className="h-28 w-full object-cover"
//               />
//             )}
//             <Button
//               variant="outline"
//               size="icon"
//               className="absolute m-2 bg-sidebar font-normal"
//             >
//               <input
//                 type="file"
//                 className="hidden border border-input shadow"
//                 accept="image/*"
//                 aria-label="Upload profile picture"
//                 {...getInputProps()}
//               />
//               <Pencil />
//             </Button>
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Pencil, SpinnerOne } from "@mynaui/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    if (currentImage && onAvatarChange) {
      onAvatarChange(currentImage);
    }
  }, [currentImage, onAvatarChange]);

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
            <Progress value={uploadProgress} className="h-2 w-full" />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <SpinnerOne className="h-4 w-4 animate-spin" />
              {uploadProgress >= 90 ? "Processing..." : "Uploading..."}
            </div>
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
