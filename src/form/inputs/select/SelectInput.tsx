import React from "react";
import {
  MiterFieldValues,
  OptionValueBase,
  SelectProps,
  Option,
  SingleSelect,
} from "../../types.ts";
import { Controller } from "react-hook-form";
import Select, { SingleValue, StylesConfig } from "react-select";
import { GroupBase } from "react-select";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import chroma from "chroma-js";
import Label from "../../basic/label/Label.tsx";
// @ts-ignore
import styles from "./SelectInput.module.css";

/** Controlled input */
export const testStyles: StylesConfig<Option<OptionValueBase>, boolean> = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (provided, state) => ({
    boxShadow: "none",
    fontSize: 15,
    height: 32,
    backgroundColor: state.selectProps.isDisabled ? "#fafafa" : "white",
    borderRadius: 4,
    border: state.isFocused
      ? "1px solid rgb(24, 61, 226)"
      : "1px solid rgb(211, 211, 211)",
    boxSizing: "border-box",
    display: "flex",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    cursor: "default",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
  }),
  clearIndicator: (provided, state) => ({ ...provided, padding: "0px" }),
  input: (provided, state) => ({
    ...provided,
    cursor: "default",
    fontSize: 15,
    margin: 0,
  }),
  singleValue: (base, state) => ({
    ...base,
    display: "flex",
    justifyContent: "flex-start",
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: "none",
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: 15,
    margin: 0,
    display: "flex",
    alignItems: "center",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma("#4D54B6");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#4D54B6"
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      display: "flex",
      justifyContent: "flex-start",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#4D54B6"
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
};

export const SelectInput = <
  T extends MiterFieldValues,
  IsClearable extends boolean
>(
  props: SelectProps<T, IsClearable>
) => {
  const {
    label,
    fieldName,
    rules,
    onValueChange,
    errors,
    control,
    options,
    clearable,
  } = props;

  return (
    <div>
      <div className={styles["select-label-wrapper"]}>
        <Label label={label} />
      </div>
      <Controller
        name={fieldName}
        control={control}
        rules={{ validate: rules }}
        render={({ field }) => {
          const { onChange, value } = field;

          const optionValue = options.find((option) => option.value === value);

          const handleChange = (
            value: SingleValue<Option<OptionValueBase>>
          ) => {
            const newValue = value === null ? null : value.value;
            onChange(newValue);
            if (clearable) {
              onValueChange<true>?.(newValue);
            } else {
              if (newValue !== null) {
                onValueChange<false>?.(newValue);
              }
            }
          };

          return (
            <Select<
              Option<OptionValueBase>,
              false,
              GroupBase<Option<OptionValueBase>>
            >
              options={options}
              onChange={handleChange}
              value={optionValue}
              defaultValue={optionValue}
              styles={testStyles}
              isClearable={clearable}
            />
          );
        }}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
