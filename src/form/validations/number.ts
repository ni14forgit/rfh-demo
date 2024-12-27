import { Data } from "../types";
import { ValidateResult } from "react-hook-form";
import { MiterFieldValues } from "../types";

/** VALIDATION GENERATORS */

type RangeProps = {
  min: number | null; // Default inclusive
  max: number | null; // Default inclusive
};

const isTruthy = (value: Data): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
};

const typeGuard = (value: Data): value is number => {
  return typeof value === "number";
};

export const withinRange = (props: RangeProps) => {
  const { min, max } = props;
  const withinRangeValidation = (
    value: Data,
    _formValues: MiterFieldValues
  ): ValidateResult => {
    if (!isTruthy(value)) {
      // Required validation is handled by the required.ts file
      return true;
    }

    if (!typeGuard(value)) {
      // Throw strict error if truthy value isn't a number
      return "This value must be a number.";
    }

    if (min !== null && value < min) {
      return `This value must be greater than ${min}.`;
    }
    if (max !== null && value > max) {
      return `This value must be less than ${max}.`;
    }
    return true;
  };
  return withinRangeValidation;
};

type DecimalPlacesProps = {
  maxDecimalPlaces: number;
};

export const hasLimitedDecimalPlaces = (props: DecimalPlacesProps) => {
  const { maxDecimalPlaces } = props;
  const hasLimitedDecimalPlacesValidation = (
    value: Data,
    _formValues: MiterFieldValues
  ): ValidateResult => {
    if (!isTruthy(value)) {
      // Required validation is handled by the required.ts file
      return true;
    }

    if (!typeGuard(value)) {
      // Throw strict error if truthy value isn't a number
      return "This value must be a number.";
    }

    const decimalPlaces = value.toString().split(".")[1]?.length || 0;
    if (decimalPlaces > maxDecimalPlaces) {
      return `This value must have at most ${maxDecimalPlaces} decimal places.`;
    }
    return true;
  };
  return hasLimitedDecimalPlacesValidation;
};
