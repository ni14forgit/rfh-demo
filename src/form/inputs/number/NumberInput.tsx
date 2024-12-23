import React from "react";
import { NumberProps, MiterFieldValues } from "../../types";
// @ts-ignore
import styles from "./NumberInput.module.css";
import Label from "../../basic/label/Label.tsx";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";

export const NumberInput = <T extends MiterFieldValues>(
  props: NumberProps<T>
) => {
  const {
    label,
    fieldName,
    rules,
    mode,
    onValueChange,
    placeholder,
    errors,
    register,
    step,
    helperText,
  } = props;

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

  return (
    <div>
      <div className={styles["number-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      <input
        type="number"
        className={styles["number-input"]}
        placeholder={placeholder}
        {...register(fieldName, { validate: rules, valueAsNumber: true })}
        onChange={(e) => onValueChange?.(Number(e.target.value))}
        disabled={isDisabled}
        readOnly={isReadOnly}
        step={step ?? undefined}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
