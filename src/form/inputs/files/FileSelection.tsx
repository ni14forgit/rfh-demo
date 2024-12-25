import React from "react";
import { FieldErrors, Path } from "react-hook-form";
import { Document, MiterFieldValues } from "../../types.ts";
// @ts-ignore
import styles from "./FilesInput.module.css";
import { ErrorMessage } from "../../basic/error-message/ErrorMessage.tsx";
import { File, X } from "@phosphor-icons/react";

type Props<T extends MiterFieldValues> = {
  file: Document;
  fieldPath: Path<T>;
  remove: () => void;
  errors: FieldErrors<T>;
};

export const FileSelection = <T extends MiterFieldValues>(props: Props<T>) => {
  const { file, fieldPath, remove, errors } = props;
  return (
    <div className={styles["file-selection-wrapper"]}>
      <div className={styles["file-selection-container"]}>
        <div className={styles["file-selection"]}>
          <div className={styles["file-selection-icon-container"]}>
            <File />
            <div className={styles["file-selection-name"]}>
              {file.file.name}
            </div>
          </div>

          <X onClick={remove} />
        </div>
      </div>
      <ErrorMessage errors={errors} fieldName={fieldPath} />
    </div>
  );
};
