import { ValidateResult } from "react-hook-form";
import { Data, MiterFieldValues, Document, Address } from "../types";

export const required = (
  value: Data,
  formValues: MiterFieldValues
): ValidateResult => {
  switch (typeof value) {
    case "string":
      return isStringRequired(value, formValues);
    case "number":
      return isNumberRequired(value, formValues);
    case "object":
      return isObjectRequired(value, formValues);
    default:
      return !!value ? true : "This field is required.";
  }
};

const isStringRequired = (
  value: string,
  formValues: MiterFieldValues
): ValidateResult => {
  return !!value ? true : "This string is required.";
};

const isNumberRequired = (
  value: number,
  formValues: MiterFieldValues
): ValidateResult => {
  if (value == null || Number.isNaN(value)) {
    return "This number is required.";
  }
  return true;
};

const isObjectRequired = (
  value: object,
  formValues: MiterFieldValues
): ValidateResult => {
  if (Array.isArray(value) && value.length === 0) {
    return "At least one selection is required.";
  }

  console.log(value);

  if (Object.keys(value).includes("line1")) {
    return "This address is required.";
  }

  return !!value ? true : "This field is required.";
};

export const customNumberValidation = (
  value: number,
  formValues: MiterFieldValues
): ValidateResult => {
  if (value < 10) {
    return "This number must be greater than 10.";
  }
  return true;
};

export const fileOver500Error = (
  value: Document,
  formValues: MiterFieldValues
): ValidateResult => {
  const {
    file: { size },
  } = value;
  if (size > 500) {
    return "This file is too large.";
  }
  return true;
};

// TODO: fix this so we consistently show the fields that are not filled, even if value is undefined.
export const addressRequired = (
  value: Address | undefined,
  formValues: MiterFieldValues
): ValidateResult => {
  if (!value) {
    return "This address is required.";
  }

  const fieldsNotFilled = Object.entries(value).filter(
    ([key, value]) => !value
  );

  if (fieldsNotFilled.length > 0) {
    return `This cool address is required. ${fieldsNotFilled
      .map(([key]) => key)
      .join(", ")}`;
  }

  return true;
};
