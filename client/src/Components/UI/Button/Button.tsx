import clsx from "clsx";

type ButtonPropsType = {
  children?: string;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  bgColor,
  textColor,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        "flex justify-center items-center py-2 px-4 text-base text-[14px] leading-none rounded hover:brightness-125	 hover:drop-shadow-md",
        (bgColor && !disabled) || "bg-app-blue-500",
        (textColor && !disabled) || "text-white",
        disabled && "bg-app-grey-200 text-app-grey-50"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
