import React from "react";
import { NumberProps, MiterFieldValues } from "../../types";
import styles from "./NumberInput.module.css";
import Label from "../../basic/label/Label.tsx";

export const NumberInput = <T extends MiterFieldValues>(
  props: NumberProps<T>
) => {
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
    step,
  } = props;

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

  return (
    <div>
      <div className={styles["number-label-wrapper"]}>
        <Label label={label} labelInfo={"This is a number."} />
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
      <div>{errors[fieldName]?.message}</div>
    </div>
  );
};
