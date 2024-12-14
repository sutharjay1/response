import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Heart, HeartSolid } from "@mynaui/icons-react";
import { format } from "date-fns";
import { errorToast, successToast } from "../global/toast";
import { GetProjectAnalyticsType } from "../projects/actions/get-project-analytics";
import { addFeedbackToFavorite } from "./actions/add-feedback-to-favourite";

const ProjectAnalyticsResponseTable = ({
  data,
  projectId,
  className,
}: {
  data: GetProjectAnalyticsType;
  projectId: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden bg-sidebar transition-all hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">
            Project Analytics
          </h2>
          <span className="text-sm text-muted-foreground">
            Detailed Field Results
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-muted/20">
              <TableHead className="p-3">Avatar</TableHead>
              <TableHead className="p-3">By</TableHead>
              <TableHead className="p-3 text-center">Value</TableHead>
              <TableHead className="p-3 text-right">Timestamp</TableHead>
              <TableHead className="p-3 text-right">Favorited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.fields.flatMap((field) =>
              field.results.map((result) => (
                <TableRow
                  key={result.id}
                  className="transition-colors hover:bg-muted/10"
                >
                  <TableCell className="p-3 font-medium text-primary">
                    <Avatar className="h-8 w-8 rounded-xl">
                      <AvatarImage src={result.avatar} alt={result.name} />
                      <AvatarFallback className="rounded-xl px-3 py-2">
                        {result.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="p-3 font-medium text-primary">
                    {result.name}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {result.value}
                  </TableCell>
                  <TableCell className="p-3 text-right text-muted-foreground">
                    {format(new Date(result.createdAt), "MMM dd, yy HH:mm")}
                  </TableCell>
                  <TableCell className="p-3 text-right text-muted-foreground">
                    <Button
                      variant={result.isFavorite ? "default" : "outline"}
                      size="sm"
                      className="px-2"
                      onClick={() => {
                        addFeedbackToFavorite(
                          projectId,
                          result.id,
                          result.isFavorite,
                        )
                          .then(() => {
                            successToast(
                              result.isFavorite
                                ? "Removed from favorites"
                                : "Added to favorites",
                              {
                                position: "top-center",
                              },
                            );
                          })
                          .catch((error) => {
                            errorToast(
                              error.message || "Something went wrong",
                              { position: "top-center" },
                            );
                          });
                      }}
                    >
                      {result.isFavorite ? <HeartSolid /> : <Heart />}
                    </Button>
                  </TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
        <span className="text-sm text-muted-foreground">
          Total fields: {data.fields.length}
        </span>
        <span className="text-sm text-muted-foreground">
          Last result time:{" "}
          {data.fields
            .flatMap((field) => field.results)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )[0]?.createdAt
            ? new Date(
                data.fields
                  .flatMap((field) => field.results)
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )[0].createdAt,
              ).toLocaleTimeString()
            : "No results available"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProjectAnalyticsResponseTable;
