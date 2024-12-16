import { Button } from "@/components/ui/button";
import { TLarge, TSmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Heart, HeartSolid, Star } from "@mynaui/icons-react";
import { FieldType } from "@prisma/client";
import Image from "next/image";
import { errorToast, successToast } from "../global/toast";
import { addFeedbackToFavorite } from "./actions/add-feedback-to-favourite";

export type ResponseType = {
  field?: { label: string; type: FieldType; checked: boolean };
  id: string;
  name: string;
  createdAt: Date;
  value: string;
  avatar: string;
  projectId: string;
  fieldId: string;
  isFavorite: boolean;
};

export const ResponseCard = ({
  response,
  projectId,
  refetch,
}: {
  response: ResponseType;
  projectId: string;
  refetch: () => void;
}) => {
  const handleAddToFavorite = async () => {
    addFeedbackToFavorite(projectId, response.id, response.isFavorite)
      .then(() => {
        successToast(
          response.isFavorite ? "Removed from favorites" : "Added to favorites",
          {
            position: "top-center",
          },
        );
        refetch();
      })
      .catch((error: Error) => {
        errorToast(error.message || "Something went wrong", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="rounded-lg border p-4 shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Image
            width={40}
            height={40}
            src={response.avatar}
            alt="User"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <TLarge>{response.name}</TLarge>
            </div>
            <TSmall className="text-sm text-gray-500">
              {new Date(response.createdAt).toLocaleString()}
            </TSmall>
            <p className="mt-2 text-gray-600">{response.value}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="group gap-2">
              <TLarge>
                {response.field?.type === "star" && response.value}{" "}
              </TLarge>
              <Star
                className={cn("h-6 w-6 text-orange-500")}
                fill="currentColor"
              />
            </Button>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "bg-none p-0 md:ml-4",
              response.isFavorite
                ? "text-rose-600 hover:text-rose-600"
                : "text-zinc-700 hover:text-zinc-800",
            )}
            onClick={handleAddToFavorite}
          >
            {response.isFavorite ? (
              <HeartSolid className="h-6 w-6" />
            ) : (
              <Heart className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
