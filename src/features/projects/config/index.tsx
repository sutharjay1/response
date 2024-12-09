import {
  CheckSquare,
  Image,
  Keyboard,
  Star,
  TypeBold,
  Video,
} from "@mynaui/icons-react";

export const fieldTypes = [
  {
    type: "input",
    icon: TypeBold,
    label: "Input",
    bgClass: "bg-blue-50 hover:bg-blue-100",
  },
  {
    type: "textarea",
    icon: Keyboard,
    label: "Textarea",
    bgClass: "bg-green-50 hover:bg-green-100",
  },
  {
    type: "checkbox",
    icon: CheckSquare,
    label: "Checkbox",
    bgClass: "bg-orange-50 hover:bg-orange-100",
  },
  {
    type: "star",
    icon: Star,
    label: "Star",
    bgClass: "bg-purple-50 hover:bg-purple-100",
  },
  {
    type: "image",
    icon: Image,
    label: "Image",
    bgClass: "bg-pink-50 hover:bg-pink-100",
  },
  {
    type: "video",
    icon: Video,
    label: "Video",
    bgClass: "bg-teal-50 hover:bg-teal-100",
  },
] as const;
