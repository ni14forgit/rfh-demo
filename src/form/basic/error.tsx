import React from "react";
import { MiterFieldValues } from "../types";
import { get } from "lodash";

type Props<T extends MiterFieldValues> = {
  errors: T;
  fieldName: string;
};

export const ErrorMessage = <T extends MiterFieldValues>({
  errors,
  fieldName,
}: Props<T>) => {
  return (
    <div>
      {get(errors, fieldName)?.message
        ? String(get(errors, fieldName)?.message)
        : ""}
    </div>
  );
};
