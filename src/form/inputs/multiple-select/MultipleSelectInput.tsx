import React from "react";
import {
  MiterFieldValues,
  OptionValueBase,
  MultipleSelectProps,
  Option,
} from "../../types.ts";
import { Controller } from "react-hook-form";
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

  const isDisabled = mode === "disabled";
  const isReadOnly = mode === "view-only";

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
              isDisabled={isDisabled || isReadOnly}
              closeMenuOnSelect={false}
            />
          );
        }}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
