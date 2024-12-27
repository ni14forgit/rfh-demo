import React from "react";
import { MiterFieldValues, TextProps } from "../../types";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import Label from "../../basic/label/Label.tsx";

export const TextInput = <T extends MiterFieldValues>({
  label,
  fieldName,
  placeholder,
  rules,
  mode,
  helperText,
  onValueChange,
  errors,
  register,
  control,
}: TextProps<T>) => {
  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

  return (
    <div>
      <Label label={label} labelInfo={helperText} />
      <input
        type="text"
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
