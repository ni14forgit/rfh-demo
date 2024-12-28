import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../form/inputs/text/TextInput.tsx";
import {
  addressRequired,
  customNumberValidation,
  required,
} from "../form/validations/all.ts";
import { NumberInput } from "../form/inputs/number/NumberInput.tsx";
import { SelectInput } from "../form/inputs/select/SelectInput.tsx";
import { FilesInput } from "../form/inputs/files/FilesInput.tsx";
import { Address, Data, Files, SingleSelect } from "../form/types.ts";
import {
  hasLimitedDecimalPlaces,
  withinRange,
} from "../form/validations/number.ts";
import { MultipleSelectInput } from "../form/inputs/multiple-select/MultipleSelectInput.tsx";
import { AddressInput } from "../form/inputs/address/AddressInput.tsx";

type SimpleFormData = {
  name: string[];
  age: number;
  favoriteSport: string;
  favoriteSports: string[];
  files: Files;
  address: Address;
};

const selectOptions = [
  { label: "Tennis", value: "tennis" },
  { label: "Basketball", value: "basketball" },
  { label: "Football", value: "football" },
  { label: "Baseball", value: "baseball" },
  { label: "Hockey", value: "hockey" },
  { label: "Soccer", value: "soccer" },
  { label: "Volleyball", value: "volleyball" },
  { label: "Golf", value: "golf" },
  { label: "Cricket", value: "cricket" },
  { label: "Rugby", value: "rugby" },
];

const SimpleForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SimpleFormData>({
    defaultValues: {
      name: ["hockey", "soccer"],
      age: undefined,
      favoriteSport: undefined,
      files: [],
      favoriteSports: ["hockey", "soccer"],
      address: {
        line1: "123 Main St",
        line2: null,
        city: "Anytown",
        state: "CA",
        postal_code: "12345",
      },
    },
  });

  const onSave = (data: SimpleFormData) => {};

  const onValueChange = <Clearable extends boolean>(
    value: Clearable extends true ? SingleSelect | null : SingleSelect
  ) => {
    console.log("Side effect here", value);
  };

  const limitedValidation = hasLimitedDecimalPlaces({
    maxDecimalPlaces: 2,
  });

  const rangeValidation = withinRange({
    min: 18,
    max: 100,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "30px",
      }}
    >
      <TextInput
        label="Name"
        fieldName="name"
        register={register}
        placeholder="Enter your name"
        rules={required}
        errors={errors}
        mode="view-only"
        size="medium"
        onValueChange={onValueChange}
        helperText="Your name assigned to you at birth."
        control={control}
      />

      <NumberInput
        label="Age"
        fieldName="age"
        register={register}
        placeholder="Enter your age"
        rules={{
          required,
          limitedValidation,
          rangeValidation,
        }}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
        step={4}
        control={control}
      />
      <SelectInput<SimpleFormData, false>
        label="Favorite Sport"
        fieldName="favoriteSport"
        control={control}
        options={selectOptions}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
        clearable={false}
      />
      <MultipleSelectInput
        label="Favorite Sports"
        fieldName="favoriteSports"
        control={control}
        options={selectOptions}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
      />
      <FilesInput
        label="Files"
        fieldName={"files"}
        control={control}
        rules={required}
        errors={errors}
        mode="disabled"
        size="medium"
        variant="dropzone-button"
      />

      <AddressInput
        label="Address"
        fieldName="address"
        control={control}
        rules={addressRequired}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
        helperText="This is a helper text"
      />

      <button style={{ marginTop: "30px" }} onClick={handleSubmit(onSave)}>
        Save
      </button>
    </div>
  );
};

export default SimpleForm;
