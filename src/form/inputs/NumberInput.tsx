import React from "react";
import { NumberProps, MiterFieldValues } from "../types";
import { FieldValues } from "react-hook-form";

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
  const cssClassName = `form ${size}`;

  return (
    <div>
      <div>{label}</div>
      <input
        type="number"
        className={cssClassName}
        placeholder={placeholder}
        {...register(fieldName, { validate: rules })}
        onChange={onValueChange}
        disabled={isDisabled}
        readOnly={isReadOnly}
        step={step ?? undefined}
      />
      <div>
        {errors[fieldName] && errors[fieldName]?.message
          ? String(errors[fieldName]?.message)
          : ""}
      </div>
    </div>
  );
};
