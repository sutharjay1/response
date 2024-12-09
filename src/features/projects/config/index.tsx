import {
  CheckSquare,
  Image,
  Keyboard,
  Star,
  TypeBold,
  Video,
} from "@mynaui/icons-react";

export type ButtonFieldType = {
  type: "input" | "textarea" | "checkbox" | "star" | "image" | "video";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
};

export const fieldTypes: ButtonFieldType[] = [
  {
    type: "input",
    icon: TypeBold,
    label: "Input",
  },
  {
    type: "textarea",
    icon: Keyboard,
    label: "Textarea",
  },
  {
    type: "checkbox",
    icon: CheckSquare,
    label: "Checkbox",
  },
  {
    type: "star",
    icon: Star,
    label: "Star",
  },
  {
    type: "image",
    icon: Image,
    label: "Image",
  },
  {
    type: "video",
    icon: Video,
    label: "Video",
  },
] as const;
