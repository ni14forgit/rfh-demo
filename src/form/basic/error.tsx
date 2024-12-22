import React from "react";
import { MiterFieldValues } from "../types";
import { get } from "lodash";
import { FieldErrors } from "react-hook-form";

type Props<T extends MiterFieldValues> = {
  errors: FieldErrors<T>;
  fieldName: string;
  isArrayRootError?: boolean;
};

export const ErrorMessage = <T extends MiterFieldValues>({
  errors,
  fieldName,
  isArrayRootError,
}: Props<T>) => {
  const fieldPath = isArrayRootError ? `${fieldName}.root` : fieldName;
  const message = get(errors, fieldPath)?.message || "";

  return <div>{message}</div>;
};
