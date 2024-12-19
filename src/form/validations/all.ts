import { Validate, ValidateResult } from "react-hook-form";
import { Data, MiterFieldValues } from "../types";
// export type Validate<TFieldValue, TFormValues> = (value: TFieldValue, formValues: TFormValues) => ValidateResult | Promise<ValidateResult>;
// TODO: Make validations more strongly typed
// Some vals should be static, others should be functions that return a validation

export const required: Validate<Data, MiterFieldValues> = (
  value: Data,
  formValues: MiterFieldValues
): ValidateResult => {
  if (Array.isArray(value) && value.length === 0) {
    return "This field is required.";
  }
  return !!value ? true : "This field is required.";
};
