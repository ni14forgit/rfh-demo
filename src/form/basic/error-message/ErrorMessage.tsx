import React from "react";
import { MiterFieldValues } from "../../types";
import get from "lodash/get";
import { FieldErrors } from "react-hook-form";
// @ts-ignore
import styles from "./ErrorMessage.module.css";

type Props<T extends MiterFieldValues> = {
  errors: FieldErrors<T>;
  fieldName: string;
  isArrayRootError?: boolean;
};

export const ErrorMessage = <T extends MiterFieldValues>({
  errors,
  fieldName,
  isArrayRootError,
}: Props<T>): React.ReactNode => {
  const fieldPath = isArrayRootError ? `${fieldName}.root` : fieldName;
  const message = get(errors, fieldPath)?.message || "";

  return <div className={styles["error-message"]}>{message}</div>;
};
