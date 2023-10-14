import clsx from "clsx";

type ButtonPropsType = {
  children?: string;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  bgColor,
  textColor,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "flex justify-center items-center py-2 px-4 text-sm  rounded hover:brightness-105	hover:drop-shadow-md h-10",
        (bgColor && !disabled) || "bg-app-blue-500",
        (textColor && !disabled) || "text-white",
        disabled &&
          "!bg-app-grey-200 !bg-opacity-20 !text-app-grey-100  hover:!brightness-100	hover:!drop-shadow-none border border-app-grey-200"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
