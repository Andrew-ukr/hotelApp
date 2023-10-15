import clsx from "clsx";

type ButtonType = "button" | "submit" | "reset";

type ButtonPropsType = {
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  bgColor,
  textColor,
  disabled = false,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "flex justify-center items-center py-2 px-4 text-sm  rounded hover:brightness-105	hover:drop-shadow-md h-10 outline-none focus:drop-shadow-md focus:brightness-105",
        (bgColor && !disabled) || "bg-app-blue-500",
        (textColor && !disabled) || "text-white",
        disabled &&
          "!bg-app-grey-200 !bg-opacity-20 !text-app-grey-100  hover:!brightness-100	hover:!drop-shadow-none focus:!drop-shadow-none focus:!brightness-100 border border-app-grey-200",
        className || ""
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
