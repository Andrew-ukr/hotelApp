import React from "react";
import { INPUT, TEXTAREA } from "../../../Utils/constants";
import clsx from "clsx";
type InputPropsTypes = {
  type?: typeof INPUT | typeof TEXTAREA;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: () => void;
};

const Input = ({
  type = INPUT,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: InputPropsTypes) => {
  const baseStyles =
    "rounded border text-sm text-app-grey-600 border-app-grey-200 outline-none focus:border-app-blue-200 hover:border-app-blue-200 hover:drop-shadow-md focus:drop-shadow-md py-2 px-4 w-80 bg-white";

  const getProperInput = () => {
    if (type === INPUT)
      return (
        <input
          className={clsx(
            baseStyles,
            disabled &&
              "!bg-app-grey-200 !bg-opacity-20 !text-app-grey-100 !placeholder:text-app-grey-100 focus:!border-app-grey-200 hover:!border-app-grey-200 hover:drop-shadow-none focus:!drop-shadow-none h-10"
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
  };

  return (
    <label className="flex flex-col">
      {label && (
        <span
          className={clsx("text-app-grey-800 text-sm mb-2 font-medium")}
        >
          {label}
        </span>
      )}
      {getProperInput()}
    </label>
  );
};

export default Input;
