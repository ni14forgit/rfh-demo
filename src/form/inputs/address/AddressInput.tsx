import React from "react";
import { Address, AddressProps, MiterFieldValues, OptionValueBase,Option } from "../../types";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import Label from "../../basic/label/Label.tsx";
import { Controller, Path, useWatch } from "react-hook-form";
import Select, { GroupBase, SingleValue } from "react-select";
import { SelectInput, testStyles } from "../select/SelectInput.tsx";
// @ts-ignore
import styles from "./AddressInput.module.css";
import { TextInput } from "../text/TextInput.tsx";

const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  // ... other states
];

type AddressHandlerProps = {
    onChange: (value: Partial<Address>) => void;
    value: Partial<Address>;
}

type AmericanStateHandlers = {
    onAmericanStateChange: (value: SingleValue<Option<OptionValueBase>>) => void;
    americanStateValue: Option<string> | undefined;
}

export const AddressInput = <T extends MiterFieldValues>(props: AddressProps<T>) => {
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

  // TODO: cast all useWatch values to Partials<T>
  const value = useWatch({ control, name: fieldName })
  const isViewOnly = mode === "view-only";
  const isDisabled = mode === "disabled";


  if (isViewOnly) {
    return (
     <div>View Only</div>
    );
  }

  const handleStateChange = (props: AddressHandlerProps): AmericanStateHandlers => {
    const { onChange, value } = props;
    const stateSelection = value?.state;
    const stateOption = US_STATES.find((option) => option.value === stateSelection);

    const onStateChange = (state: SingleValue<Option<OptionValueBase>>) => {
      if (!state) return;
      onChange({...value, state: state?.value as string})
    };
    return {
        onAmericanStateChange: onStateChange,
        americanStateValue: stateOption
    }

  
  };

  const handleLine1Change = (props: AddressHandlerProps) => {
    const { onChange, value } = props;
    
    const onLine1Change = (line1: string) => {
      onChange({...value, line1});
    };

    return {
      onLine1Change,
      line1Value: value?.line1
    };
  };

  const handleLine2Change = (props: AddressHandlerProps) => {
    const { onChange, value } = props;
    
    const onLine2Change = (line2: string) => {
      onChange({...value, line2});
    };

    return {
      onLine2Change, 
      line2Value: value?.line2
    };
  };

  const handleCityChange = (props: AddressHandlerProps) => {
    const { onChange, value } = props;
    
    const onCityChange = (city: string) => {
      onChange({...value, city});
    };

    return {
      onCityChange,
      cityValue: value?.city
    };
  };

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

        const onAddressChange = onChange as (value: Partial<Address>) => void;
        // TODO: create a utility function to creates a full address here and during the useWatch for view mode. 
        const addressValue = value || {
            postal_name: null,
            line1: "",
            line2: null,
            city: "",
            state: "",
            postal_code: "",
            country: null,
        } as Partial<Address>;

        const { onAmericanStateChange, americanStateValue } = handleStateChange({onChange: onAddressChange, value: addressValue});
        const { onLine1Change, line1Value } = handleLine1Change({onChange: onAddressChange, value: addressValue});
        const { onLine2Change, line2Value } = handleLine2Change({onChange: onAddressChange, value: addressValue});
        const { onCityChange, cityValue } = handleCityChange({onChange: onAddressChange, value: addressValue});


        return (
            <div>
          <Select<
            Option<OptionValueBase>,
            false,
            GroupBase<Option<OptionValueBase>>
          >
            options={US_STATES}
            onChange={onAmericanStateChange}
            value={americanStateValue}
            defaultValue={americanStateValue}
            styles={testStyles}
          />
          <input
            type="text"
            value={line1Value ?? ""}
            onChange={(e) => onLine1Change(e.target.value)}
            placeholder="Address Line 1"
          />
          <input 
            type="text"
            value={line2Value ?? ""}
            onChange={(e) => onLine2Change(e.target.value)}
            placeholder="Address Line 2"
          />
          <input
            type="text" 
            value={cityValue ?? ""}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="City"
          />
          </div>
        );
      }}
    />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
