import React from "react";
import { TextProps, MiterFieldValues } from "../../types.ts";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import Label from "../../basic/label/Label.tsx";
// @ts-ignore
import styles from "./TextInput.module.css";

export const TextInput = <T extends MiterFieldValues>(props: TextProps<T>) => {
  const {
    label,
    fieldName,
    rules,
    mode,
    helperText,
    onValueChange,
    placeholder,
    errors,
    register,
  } = props;

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

  // TODO: implement view only mode, which is just display text

  return (
    <div>
      <div className={styles["text-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      <input
        className={styles["text-input"]}
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
