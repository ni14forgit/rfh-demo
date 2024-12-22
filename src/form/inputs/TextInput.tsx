import React from "react";
import { TextProps, MiterFieldValues } from "../types";
import { ErrorMessage } from "../basic/error.tsx";

export const TextInput = <T extends MiterFieldValues>(props: TextProps<T>) => {
  const {
    label,
    fieldName,
    rules,
    mode,
    size,
    onValueChange,
    placeholder,
    errors,
    register,
  } = props;

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";
  const cssClassName = `form ${size}`;

  return (
    <div>
      <div>{label}</div>
      <input
        className={cssClassName}
        placeholder={placeholder}
        {...register(fieldName, { validate: rules })}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
