import {
  UseFormReturn,
  FieldValues,
  RegisterOptions,
  Control,
  FieldErrors,
  Path,
  FieldArrayPath,
  ArrayPath,
} from "react-hook-form";
import { DateTime } from "luxon";

export type Option<T extends OptionValueBase> = {
  label: string;
  value: T;
};

export type OptionValueBase =
  | {
      [key: string]: unknown;
    }
  | string;

export type Document = {
  file: File;
  id: string;
};

type Text = string;
type Date = DateTime;
export type Files = Document[]; // $TSFixMe
type Phone = string;
type Email = string;
type SSN = string;
type SingleSelect = OptionValueBase;
type MultiSelect = OptionValueBase[];
type Radio = OptionValueBase;
type Checkbox = boolean;

export type Data =
  | Text
  | number
  | boolean
  | Date
  | Files
  | Phone
  | Email
  | SSN
  | SingleSelect
  | MultiSelect
  | Radio
  | Checkbox;

export type MiterFieldValues = Record<string, Data>;

type CommonProps<T extends MiterFieldValues> = {
  label: string;
  rules: RegisterOptions["validate"];
  errors: FieldErrors<T>;
  mode: "view-only" | "editable" | "disabled";
  size: "small" | "medium" | "large";
  // TODO: Make this more strongly typed, and add a type for the value (specific string types)
  onValueChange: (value: Data) => void | Promise<void>;
};

/** Text, number will be uncontrolled components */

export type TextProps<T extends MiterFieldValues> = CommonProps<T> & {
  placeholder: string;
  fieldName: Path<T>;
  register: UseFormReturn<T>["register"];
};

export type NumberProps<T extends MiterFieldValues> = CommonProps<T> & {
  placeholder: string;
  step: number | null;
  fieldName: Path<T>;
  register: UseFormReturn<T>["register"];
};

/**
 * CONTROLLED components
 *
 * Select
 * Multi-select
 * Signature
 * Date picker
 * Phone
 *
 * */

export type SelectProps<T extends MiterFieldValues> = CommonProps<T> & {
  control: Control<T>;
  options: Option<OptionValueBase>[];
  fieldName: Path<T>;
};

// /** Files will the useFieldArray hook for performance */
export type FilesProps<T extends MiterFieldValues> = CommonProps<T> & {
  control: Control<T>;
  variant: "dropzone" | "button" | "dropzone-button";
  fieldName: FieldArrayPath<T>;
};
