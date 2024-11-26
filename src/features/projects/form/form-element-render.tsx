import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";

interface FormElement {
  id: string | number;
  type: "input" | "textarea" | "checkbox";
  label: string;
  value?: string;
  checked?: boolean;
}

interface FormElementRendererProps {
  element: FormElement;
  index: number;
  totalElements: number;
  onMove: (index: number, direction: "up" | "down") => void;
  onChange: <T extends string | boolean>(
    id: string | number,
    field: string,
    value: T,
  ) => void;
  onRemove: (id: string | number) => void;
}

export function FormElementRenderer({
  element,
  index,
  totalElements,
  onMove,
  onChange,
  onRemove,
}: FormElementRendererProps) {
  return (
    <Card className="group relative transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="cursor-move opacity-40 transition-opacity group-hover:opacity-100">
              <GripVertical className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="ml-2 font-medium">
              {element.type}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, "up")}
              disabled={index === 0}
              className="h-8 w-8 rounded-xl p-0"
            >
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only">Move up</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, "down")}
              disabled={index === totalElements - 1}
              className="h-8 w-8 rounded-xl p-0"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Move down</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(element.id)}
              className="h-8 w-8 rounded-xl p-0 text-destructive hover:text-destructive/80"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove element</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor={`${element.id}-label`}
              className="text-sm font-medium"
            >
              Label
            </Label>
            <Input
              id={`${element.id}-label`}
              value={element.label}
              onChange={(e) => onChange(element.id, "label", e.target.value)}
              placeholder="Enter field label"
              className="transition-colors focus-visible:ring-1"
            />
          </div>

          {(element.type === "input" || element.type === "textarea") && (
            <div className="space-y-2">
              <Label
                htmlFor={`${element.id}-value`}
                className="text-sm font-medium"
              >
                Default Value
              </Label>
              {element.type === "input" ? (
                <Input
                  id={`${element.id}-value`}
                  value={element.value}
                  onChange={(e) =>
                    onChange(element.id, "value", e.target.value)
                  }
                  placeholder="Enter default value"
                  className="transition-colors focus-visible:ring-1"
                />
              ) : (
                <Textarea
                  id={`${element.id}-value`}
                  value={element.value}
                  onChange={(e) =>
                    onChange(element.id, "value", e.target.value)
                  }
                  placeholder="Enter default value"
                  className="min-h-[100px] transition-colors focus-visible:ring-1"
                />
              )}
            </div>
          )}

          {element.type === "checkbox" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${element.id}-checked`}
                checked={element.checked}
                onCheckedChange={(checked) =>
                  onChange(element.id, "checked", checked)
                }
              />
              <Label
                htmlFor={`${element.id}-checked`}
                className="text-sm font-medium text-muted-foreground"
              >
                Checked by default
              </Label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
