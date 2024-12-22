import React, { useRef } from "react";
import { FilesProps, MiterFieldValues } from "../types.ts";
import {
  ArrayPath,
  Controller,
  FieldArray,
  Path,
  useFieldArray,
} from "react-hook-form";
import { Document } from "../types.ts";
import { ErrorMessage } from "../basic/error.tsx";
import { secondFileThrowError } from "../validations/all.ts";

/** Controlled file input component using useFieldArray for better performance */
export const FileInput = <T extends MiterFieldValues>(props: FilesProps<T>) => {
  const { label, fieldName, rules, errors, control } = props;

  const { fields, append, remove } = useFieldArray<T, typeof fieldName>({
    control,
    name: fieldName,
    rules: { validate: rules },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleAddDocuments = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);

    const files = uploadedFiles.map((file) => ({
      file,
    }));

    append(files as FieldArray<T, ArrayPath<T>>[]);

    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <input
        multiple
        ref={hiddenFileInput}
        type="file"
        onChange={handleAddDocuments}
      />
      <div>{label}</div>
      {fields.map((file, index) => {
        const castedFile = file as unknown as Document;
        const fieldPath = `${fieldName}.${index}` as Path<T>;
        return (
          <div key={index}>
            <Controller
              control={control}
              name={fieldPath}
              rules={{
                validate: (w, y) => {
                  return secondFileThrowError(w, y);
                },
              }}
              render={() => {
                return (
                  <div>
                    <button onClick={() => remove(index)}>
                      {"remove" + castedFile.file.name}
                    </button>
                    <ErrorMessage errors={errors} fieldName={fieldPath} />
                  </div>
                );
              }}
            />
          </div>
        );
      })}

      <ErrorMessage
        errors={errors}
        fieldName={fieldName}
        isArrayRootError={true}
      />
    </div>
  );
};
