import React from "react";
import styles from "./Label.module.css";
import "./ToolTip.css";
import { Info } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";

type Props = {
  label: string;
  labelInfo?: string;
  tooltipPlace?: "top" | "right" | "bottom" | "left";
  onClick?: () => Promise<void>;
};

const Label: React.FC<Props> = ({ label, labelInfo, onClick }) => {
  return (
    <div onClick={onClick}>
      <span
        data-tooltip-id="my-tooltip"
        data-tooltip-content={labelInfo}
        className={styles["label-wrapper"]}
      >
        <Tooltip
          className={"label-tooltip"}
          id={"my-tooltip"}
          content={labelInfo}
        ></Tooltip>
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
