export type FormElementType =
  | "input"
  | "textarea"
  | "checkbox"
  | "star"
  | "image"
  | "video";

export interface BaseFormElement {
  id: string;
  label: string;
  type: FormElementType;
}

export interface InputField extends BaseFormElement {
  type: "input";
  value: string;
}

export interface TextareaField extends BaseFormElement {
  type: "textarea";
  value: string;
}

export interface CheckboxField extends BaseFormElement {
  type: "checkbox";
  checked: boolean;
}

export interface StarField extends BaseFormElement {
  type: "star";
  value: string;
}

export interface ImageField extends BaseFormElement {
  type: "image";
  value: string;
}
export interface VideoField extends BaseFormElement {
  type: "video";
  value: string;
}

export type FormElement =
  | InputField
  | TextareaField
  | CheckboxField
  | StarField
  | ImageField
  | VideoField;
