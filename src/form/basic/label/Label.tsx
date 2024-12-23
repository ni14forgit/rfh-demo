import React, { useId } from "react";
// @ts-ignore
import styles from "./Label.module.css";
import { Info } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";

type Props = {
  label: string;
  labelInfo?: string;
  tooltipPlace?: "top" | "right" | "bottom" | "left";
  onClick?: () => Promise<void>;
};

const Label: React.FC<Props> = ({ label, labelInfo, onClick }) => {
  const id = useId();
  return (
    <div onClick={onClick}>
      <span
        data-tooltip-id={id}
        data-tooltip-content={labelInfo}
        className={styles["label-wrapper"]}
      >
        <Tooltip
          style={{
            backgroundColor: "#4D54B6",
            fontSize: "14px",
          }}
          id={id}
          content={labelInfo}
        />
        <span className={styles["label-text"]}>{label}</span>
        {labelInfo ? (
          <div className={styles["label-info-icon-wrapper"]}>
            <Info className={styles["label-info-icon"]} />
          </div>
        ) : null}
      </span>
    </div>
  );
};

export default Label;
