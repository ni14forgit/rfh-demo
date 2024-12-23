import React from "react";
import {
  MiterFieldValues,
  OptionValueBase,
  SelectProps,
  Option,
} from "../types.ts";
import { Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { GroupBase } from "react-select";
import { ErrorMessage } from "../basic/error-message/ErrorMessage.tsx";

/** Controlled input */

export const SelectInput = <T extends MiterFieldValues>(
  props: SelectProps<T>
) => {
  const { label, fieldName, rules, onValueChange, errors, control, options } =
    props;

  return (
    <div>
      {label}
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
            if (!value) return;
            onChange(value.value);
            onValueChange?.(value.value);
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
            />
          );
        }}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
