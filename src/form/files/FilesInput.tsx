import React from "react";
import { FilesProps, MiterFieldValues } from "../types.ts";
import {
  ArrayPath,
  Controller,
  FieldArray,
  Path,
  useFieldArray,
} from "react-hook-form";
import { Document } from "../types.ts";
import { ErrorMessage } from "../basic/error-message/ErrorMessage.tsx";
import { fileOver500Error } from "../validations/all.ts";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import styles from "./FilesInput.module.css";
import Label from "../basic/label/Label.tsx";

/** Controlled file input component using useFieldArray for better performance */
export const FilesInput = <T extends MiterFieldValues>(
  props: FilesProps<T>
) => {
  const { label, fieldName, rules, errors, control, helperText } = props;
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => ({
        file,
      }));
      append(files as FieldArray<T, ArrayPath<T>>[]);
    },
  });

  const { fields, append, remove } = useFieldArray<T, typeof fieldName>({
    control,
    name: fieldName,
    rules: { validate: rules },
  });

  return (
    <div>
      {/* <input
        multiple
        ref={hiddenFileInput}
        type="file"
        onChange={handleAddDocuments}
      /> */}
      <div className={styles["files-input-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div className={styles["dropzone-content"]}>
          <p>Drag and drop files here, or click to select files</p>
        </div>
      </div>
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
                  return fileOver500Error(w, y);
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
