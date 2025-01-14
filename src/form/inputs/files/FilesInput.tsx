import React from "react";
import { FilesProps, MiterFieldValues } from "../../types.ts";
import {
  ArrayPath,
  Controller,
  FieldArray,
  Path,
  useFieldArray,
} from "react-hook-form";
import { Document } from "../../types.ts";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import { fileOver500Error } from "../../validations/all.ts";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import styles from "./FilesInput.module.css";
import Label from "../../basic/label/Label.tsx";
import { FileSelection } from "./FileSelection.tsx";
import { File } from "@phosphor-icons/react";

/** Controlled file input component using useFieldArray for better performance */
export const FilesInput = <T extends MiterFieldValues>(
  props: FilesProps<T>
) => {
  const { label, fieldName, rules, errors, control, helperText, mode } = props;
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => ({
        file,
      }));
      append(files as FieldArray<T, ArrayPath<T>>[]);
    },
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const { fields, append, remove } = useFieldArray<T, typeof fieldName>({
    control,
    name: fieldName,
    rules: { validate: rules },
  });

  const isViewOnly = mode === "view-only";

  return (
    <div>
      <div className={styles["files-input-label-wrapper"]}>
        <Label label={label} labelInfo={helperText} />
      </div>
      {isViewOnly ? null : (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <div className={styles["dropzone-content"]}>
            <div className={styles["dropzone-content-icon"]}>
              <File size={20} />
            </div>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
      )}
      <div className={styles["files-input-files-wrapper"]}>
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
                    <FileSelection
                      file={castedFile}
                      fieldPath={fieldPath}
                      remove={() => remove(index)}
                      errors={errors}
                    />
                  );
                }}
              />
            </div>
          );
        })}
      </div>

      <ErrorMessage
        errors={errors}
        fieldName={fieldName}
        isArrayRootError={true}
      />
    </div>
  );
};
