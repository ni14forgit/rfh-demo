import React, { FC } from "react";
import { FieldArrayPath, useForm } from "react-hook-form";
import { TextInput } from "../form/inputs/TextInput.tsx";
import { required } from "../form/validations/all.ts";
import { NumberInput } from "../form/inputs/NumberInput.tsx";
import { SelectInput } from "../form/inputs/SelectInput.tsx";
import { FileInput } from "../form/inputs/FileInput.tsx";
import { Files } from "../form/types.ts";

type SimpleFormData = {
  name: string;
  age: number;
  favoriteSport: string;
  files: Files;
};

// TODO: utility function to build defaultValues of a form

const SimpleForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SimpleFormData>({
    defaultValues: {
      name: "",
      age: 0,
      favoriteSport: "tennis",
      files: [],
    },
  });

  const onSave = (data: SimpleFormData) => {
    console.log(data);
  };

  return (
    <div>
      <TextInput
        label="Name"
        fieldName="name"
        register={register}
        placeholder="Enter your name"
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={() => {}}
      />
      <NumberInput
        label="Age"
        fieldName="age"
        register={register}
        placeholder="Enter your age"
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={() => {}}
        step={4}
      />
      <SelectInput
        label="Favorite Sport"
        fieldName="favoriteSport"
        control={control}
        options={[
          { label: "Tennis", value: "tennis" },
          { label: "Basketball", value: "basketball" },
          { label: "Football", value: "football" },
        ]}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={() => {}}
      />
      <FileInput
        label="Files"
        fieldName={"files"}
        control={control}
        rules={required}
        errors={errors}
        mode="editable"
        size="medium"
        onValueChange={() => {}}
        variant="dropzone-button"
      />
      <button onClick={handleSubmit(onSave)}>Save</button>
    </div>
  );
};

export default SimpleForm;
