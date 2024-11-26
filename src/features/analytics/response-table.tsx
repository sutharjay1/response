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
import { format } from "date-fns";
import { GetProjectAnalyticsType } from "../projects/actions/get-project-analytics";

const ProjectAnalyticsResponseTable = ({
  data,
}: {
  data: GetProjectAnalyticsType;
}) => {
  return (
    <Card className="overflow-hidden bg-sidebar transition-all hover:shadow-md">
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
              <TableHead className="p-3">Field Name</TableHead>
              <TableHead className="p-3">Type</TableHead>
              <TableHead className="p-3 text-right">Value</TableHead>
              <TableHead className="p-3 text-right">Timestamp</TableHead>
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
                    {field.label}
                  </TableCell>
                  <TableCell className="p-3">{field.type}</TableCell>
                  <TableCell className="p-3 text-center text-secondary">
                    {result.value}
                  </TableCell>
                  <TableCell className="p-3 text-right text-muted-foreground">
                    {format(new Date(result.createdAt), "MMM dd, yy HH:mm")}
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
