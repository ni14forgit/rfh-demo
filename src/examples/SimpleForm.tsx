import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../form/inputs/text/TextInput.tsx";
import { customNumberValidation, required } from "../form/validations/all.ts";
import { NumberInput } from "../form/inputs/number/NumberInput.tsx";
import { SelectInput } from "../form/inputs/select/SelectInput.tsx";
import { FileInput } from "../form/inputs/FileInput.tsx";
import { Data, Files } from "../form/types.ts";

type SimpleFormData = {
  name: string;
  age: number;
  favoriteSport: string;
  files: Files;
};

const selectOptions = [
  { label: "Tennis", value: "tennis" },
  { label: "Basketball", value: "basketball" },
  { label: "Football", value: "football" },
];

const SimpleForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SimpleFormData>({
    defaultValues: {
      name: "",
      age: undefined,
      favoriteSport: undefined,
      files: [],
    },
  });

  const onSave = (data: SimpleFormData) => {};

  const onValueChange = (value: Data) => {
    console.log("Side effect here", value);
  };

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
      />

      <NumberInput
        label="Age"
        fieldName="age"
        register={register}
        placeholder="Enter your age"
        rules={{
          required,
          customNumberValidation,
        }}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
        step={4}
      />
      <SelectInput
        label="Favorite Sport"
        fieldName="favoriteSport"
        control={control}
        options={selectOptions}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={onValueChange}
      />
      <FileInput
        label="Files"
        fieldName={"files"}
        control={control}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        variant="dropzone-button"
      />

      <button style={{ marginTop: "30px" }} onClick={handleSubmit(onSave)}>
        Save
      </button>
    </div>
  );
};

export default SimpleForm;
