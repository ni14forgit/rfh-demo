import React from "react";
import {
  Address,
  AddressProps,
  MiterFieldValues,
  OptionValueBase,
  Option,
} from "../../types";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import Label from "../../basic/label/Label.tsx";
import { Controller, Path, useWatch } from "react-hook-form";
import Select, { GroupBase, SingleValue } from "react-select";
import { SelectInput, testStyles } from "../select/SelectInput.tsx";
import textStyles from "../text/TextInput.module.css";

// @ts-ignore
import styles from "./AddressInput.module.css";
import { TextInput } from "../text/TextInput.tsx";

const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  // ... other states
];

type AddressHandlerProps = {
  onChange: (value: Address) => void;
  value: Address;
};

type TerritoryHandlers = {
  onTerritoryChange: (value: SingleValue<Option<OptionValueBase>>) => void;
  territoryValue: Option<string> | undefined;
};

export const isEmptyAddress = (address?: Partial<Address> | null): boolean => {
  return (
    !address ||
    (!address.line1 &&
      !address.line2 &&
      !address.city &&
      !address.state &&
      !address.postal_code)
  );
};

export const addressString = (
  address: Address | undefined,
  breaks = false
): string => {
  if (isEmptyAddress(address)) return "";
  // TODO: make this a constant
  if (!address) return "No address";

  const b = breaks ? " \n" : ", ";

  const line1 = address.line1 ? address.line1 + b : "";
  const line2 = address.line2 ? address.line2 + b : "";
  const city = address.city ? address.city + ", " : "";
  const state = address.state ? address.state + " " : "";
  const postal_code = address.postal_code || "";

  return line1 + line2 + city + state + postal_code;
};

export const AddressInput = <T extends MiterFieldValues>(
  props: AddressProps<T>
) => {
  const {
    label,
    fieldName,
    rules,
    mode,
    helperText,
    onValueChange,
    errors,
    control,
  } = props;

  const value = useWatch({ control, name: fieldName });
  const isViewOnly = mode === "view-only";
  const isDisabled = mode === "disabled";

  if (isViewOnly) {
    return <div>{addressString(value)}</div>;
  }

  const handleTerritoryChange = (
    props: AddressHandlerProps
  ): TerritoryHandlers => {
    const { onChange, value } = props;
    const stateSelection = value?.state;

    const territoryValue = US_STATES.find(
      (option) => option.value === stateSelection
    );

    const onTerritoryChange = (state: SingleValue<Option<OptionValueBase>>) => {
      const newAddress = {
        ...value,
        state: state === null ? "" : (state.value as string),
      };
      onChange(newAddress);
      onValueChange?.(newAddress);
    };
    return {
      onTerritoryChange,
      territoryValue,
    };
  };

  const handleLine1Change = (props: AddressHandlerProps) => {
    const { onChange, value } = props;

    const onLine1Change = (line1: string) => {
      const newAddress = { ...value, line1 };
      onChange(newAddress);
      onValueChange?.(newAddress);
    };

    return {
      onLine1Change,
      line1Value: value?.line1,
    };
  };

  const handleLine2Change = (props: AddressHandlerProps) => {
    const { onChange, value } = props;

    const onLine2Change = (line2: string) => {
      const newAddress = { ...value, line2 };
      onChange(newAddress);
      onValueChange?.(newAddress);
    };

    return {
      onLine2Change,
      line2Value: value?.line2,
    };
  };

  const handleCityChange = (props: AddressHandlerProps) => {
    const { onChange, value } = props;

    const onCityChange = (city: string) => {
      const newAddress = { ...value, city };
      onChange(newAddress);
      onValueChange?.(newAddress);
    };

    return {
      onCityChange,
      cityValue: value?.city,
    };
  };

  const handleZipChange = (props: AddressHandlerProps) => {
    const { onChange, value } = props;

    const onZipChange = (zip: string) => {
      const newAddress = { ...value, postal_code: zip };
      onChange(newAddress);
      onValueChange?.(newAddress);
    };

    return {
      onZipChange,
      zipValue: value?.postal_code,
    };
  };

  return (
    <div>
      <div className={styles["address-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      <Controller
        name={fieldName}
        control={control}
        rules={{ validate: rules }}
        render={({ field }) => {
          const { onChange, value } = field;

          const onAddressChange = onChange as (value: Address) => void;
          // TODO: create a utility function to creates a full address here and during the useWatch for view mode.
          const addressValue =
            value ||
            ({
              line1: "",
              line2: null,
              city: "",
              state: "",
              postal_code: "",
            } as Address);

          const { onTerritoryChange, territoryValue } = handleTerritoryChange({
            onChange: onAddressChange,
            value: addressValue,
          });
          const { onLine1Change, line1Value } = handleLine1Change({
            onChange: onAddressChange,
            value: addressValue,
          });
          const { onLine2Change, line2Value } = handleLine2Change({
            onChange: onAddressChange,
            value: addressValue,
          });
          const { onCityChange, cityValue } = handleCityChange({
            onChange: onAddressChange,
            value: addressValue,
          });
          const { onZipChange, zipValue } = handleZipChange({
            onChange: onAddressChange,
            value: addressValue,
          });

          return (
            <div>
              <div className={styles["line-wrapper"]}>
                <input
                  type="text"
                  value={line1Value ?? ""}
                  onChange={(e) => onLine1Change(e.target.value)}
                  placeholder="Line 1"
                  className={textStyles["text-input"]}
                />
              </div>
              <div className={styles["line-wrapper"]}>
                <input
                  type="text"
                  value={line2Value ?? ""}
                  onChange={(e) => onLine2Change(e.target.value)}
                  placeholder="Line 2"
                  className={textStyles["text-input"]}
                />
              </div>
              <div className={styles["city-state-zip-wrapper"]}>
                <input
                  type="text"
                  value={cityValue ?? ""}
                  onChange={(e) => onCityChange(e.target.value)}
                  placeholder="City"
                  className={textStyles["text-input"]}
                />
                <div className={styles["territory-wrapper"]}>
                  <Select<
                    Option<OptionValueBase>,
                    false,
                    GroupBase<Option<OptionValueBase>>
                  >
                    options={US_STATES}
                    onChange={onTerritoryChange}
                    value={territoryValue}
                    defaultValue={territoryValue}
                    styles={testStyles}
                    isClearable={false}
                  />
                </div>
                <input
                  type="text"
                  value={zipValue ?? ""}
                  onChange={(e) => onZipChange(e.target.value)}
                  placeholder="Zip"
                  className={textStyles["text-input"]}
                />
              </div>
            </div>
          );
        }}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
