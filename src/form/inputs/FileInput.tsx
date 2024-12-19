import React from "react";
import { FilesProps, MiterFieldValues } from "../types.ts";
import {
  ArrayPath,
  Controller,
  FieldArray,
  FieldArrayPath,
  Path,
  useFieldArray,
} from "react-hook-form";
import { ErrorMessage } from "../basic/error.tsx";
import { Document } from "../types.ts";

/** Controlled file input component using useFieldArray for better performance */
export const FileInput = <T extends MiterFieldValues>(props: FilesProps<T>) => {
  const {
    label,
    fieldName,
    rules,
    mode,
    onValueChange,
    errors,
    control,
    variant,
  } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      append({ file, id: "hi" } as FieldArray<T, ArrayPath<T>>);
    });
    onValueChange?.(fields.map((f) => f));
  };

  const removeFile = (index: number) => {
    remove(index);
    onValueChange?.(fields.map((f) => f));
  };

  const renderFileList = () => (
    <ul>
      {fields.map((field, index) => {
        console.log(field);
        return (
          <li key={field.id}>
            {mode === "editable" && (
              <button type="button" onClick={() => removeFile(index)}>
                Remove
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  const renderDropzone = () => (
    <div
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: mode === "editable" ? "pointer" : "default",
      }}
      onClick={() =>
        mode === "editable" &&
        document.getElementById(`file-input-${fieldName}`)?.click()
      }
    >
      <input
        id={`file-input-${fieldName}`}
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={mode === "disabled" || mode === "view-only"}
      />
      <p>Drag & drop files here, or click to select files</p>
    </div>
  );

  const renderButton = () =>
    mode === "editable" && (
      <div>
        <input
          id={`file-input-${fieldName}`}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() =>
            document.getElementById(`file-input-${fieldName}`)?.click()
          }
        >
          Upload Files
        </button>
      </div>
    );

  return (
    <div>
      {label}
      <Controller
        name={fieldName}
        control={control}
        rules={{ validate: rules }}
        render={() => (
          <div>
            {variant === "dropzone" && renderDropzone()}
            {variant === "button" && renderButton()}
            {variant === "dropzone-button" && (
              <>
                {renderDropzone()}
                {renderButton()}
              </>
            )}
            {renderFileList()}
          </div>
        )}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};
