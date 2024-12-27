import {
  UseFormReturn,
  RegisterOptions,
  Control,
  FieldErrors,
  Path,
  FieldArrayPath,
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
type MultipleSelect = OptionValueBase[];
type Radio = OptionValueBase;
type Checkbox = boolean;
export type Address = {
  postal_name: string | null
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string | null;
};

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
  | MultipleSelect
  | Radio
  | Checkbox
  | Address
  | undefined;

export type MiterFieldValues = Record<string, Data>;

type CommonProps<T extends MiterFieldValues> = {
  label: string;
  rules: RegisterOptions["validate"];
  errors: FieldErrors<T>;
  mode: "view-only" | "editable" | "disabled";
  size: "small" | "medium" | "large";
  helperText?: string;
  control: Control<T>;
};

/**
 * Uncontrolled components
 *
 * Text
 * Number
 *
 * */

export type TextProps<T extends MiterFieldValues> = CommonProps<T> & {
  placeholder: string;
  fieldName: Path<T>;
  register: UseFormReturn<T>["register"];
  onValueChange?: (value: Text) => void | Promise<void>;
};

export type NumberProps<T extends MiterFieldValues> = CommonProps<T> & {
  placeholder: string;
  step: number | null;
  fieldName: Path<T>;
  register: UseFormReturn<T>["register"];
  onValueChange?: (value: number) => void | Promise<void>;
};


/**
 * Controlled components
 *
 * Select
 * Files
 *
 * */

export type SelectProps<T extends MiterFieldValues> = CommonProps<T> & {
  options: Option<OptionValueBase>[];
  fieldName: Path<T>;
  onValueChange?: (value: SingleSelect) => void | Promise<void>;
};

export type MultipleSelectProps<T extends MiterFieldValues> = CommonProps<T> & {
  control: Control<T>;
  options: Option<OptionValueBase>[];
  fieldName: Path<T>;
  onValueChange?: (value: MultipleSelect) => void | Promise<void>;
};

export type AddressProps<T extends MiterFieldValues> = CommonProps<T> & {
  control: Control<T>;
  fieldName: Path<T>;
  onValueChange?: (value: Address) => void | Promise<void>;
};


// /** Files will the useFieldArray hook for performance */
export type FilesProps<T extends MiterFieldValues> = CommonProps<T> & {
  control: Control<T>;
  variant: "dropzone" | "button" | "dropzone-button";
  fieldName: FieldArrayPath<T>;
  onValueAppend?: (value: Document[]) => void | Promise<void>;
  onValueRemove?: (index: number) => void | Promise<void>;
};
