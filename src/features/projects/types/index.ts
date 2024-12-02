export type FormElementType = "input" | "textarea" | "checkbox" | "star";

export interface BaseFormElement {
  id: number;
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

export type FormElement =
  | InputField
  | TextareaField
  | CheckboxField
  | StarField;
