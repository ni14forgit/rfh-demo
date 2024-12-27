import React, { useMemo } from "react";
import {
  MiterFieldValues,
  OptionValueBase,
  MultipleSelectProps,
  Option,
} from "../../types.ts";
import { Controller, useWatch } from "react-hook-form";
import Select, { MultiValue, StylesConfig } from "react-select";
import { GroupBase } from "react-select";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import Label from "../../basic/label/Label.tsx";
// @ts-ignore
import styles from "./MultipleSelectInput.module.css";
import { testStyles } from "../select/SelectInput.tsx";

/** Controlled input */
const multiSelectStyles: StylesConfig<Option<OptionValueBase>, true> = {
  ...testStyles,
  control: (provided, state) => ({
    ...testStyles?.control?.(provided, state),
    height: undefined,
  }),
};

export const MultipleSelectInput = <T extends MiterFieldValues>(
  props: MultipleSelectProps<T>
) => {
  const {
    label,
    fieldName,
    rules,
    onValueChange,
    errors,
    control,
    options,
    mode,
    helperText,
  } = props;

  const value = useWatch({ control, name: fieldName });

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

  const readonlyValue = useMemo(() => {
    if (!isReadOnly) return ""; // Return early if not in view-only mode
    const selectedOptions = options.filter((option) =>
      value?.includes(option.value)
    );

    if (selectedOptions.length === 0) return "";
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    if (selectedOptions.length === 2)
      return `${selectedOptions[0].label} and ${selectedOptions[1].label}`;
    return selectedOptions.map((option) => option.label).join(", ");
  }, [value, options, isReadOnly]);

  if (isReadOnly) {
    return <div>{readonlyValue}</div>;
  }

  return (
    <div>
      <div className={styles["multiple-select-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      <Controller
        name={fieldName}
        control={control}
        rules={{ validate: rules }}
        render={({ field }) => {
          const { onChange, value } = field;

          const selectedOptions = options.filter((option) =>
            value?.includes(option.value)
          );

          const handleChange = (
            newValue: MultiValue<Option<OptionValueBase>>
          ) => {
            const values = newValue.map((item) => item.value);
            onChange(values);
            onValueChange?.(values);
          };

          return (
            <Select<
              Option<OptionValueBase>,
              true,
              GroupBase<Option<OptionValueBase>>
            >
              isMulti
              options={options}
              onChange={handleChange}
              value={selectedOptions}
              defaultValue={selectedOptions}
              styles={multiSelectStyles}
              isDisabled={isDisabled}
              closeMenuOnSelect={false}
            />
          );
        }}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
