import Icon from "../Icon/Icon";
import clsx from "clsx";

type SearchPropsTypes = {
  value?: string;
  onChange?: () => void;
  onSubmit?: () => void;
  placeholder?: string;
  classNameInput?: string;
  className?: string;
  disabled?: boolean;
};

const baseStyles =
"rounded border text-base text-app-grey-600 border-app-grey-200 outline-none focus:border-app-blue-200 hover:border-app-blue-200 hover:drop-shadow-md focus:drop-shadow-md py-2 pr-4 pl-10 w-80 bg-app-grey-50 bg-opacity-20";

const Search: React.FC<SearchPropsTypes> = ({
  onSubmit,
  value,
  onChange,
  placeholder = "Search for rooms and offers",
  disabled = false,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <span className="absolute z-10 flex justify-center items-center left-0 top-0 bottom-0 w-10">
        <Icon name="MagnifyingGlass" />
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          baseStyles,
          disabled &&
            "!bg-app-grey-200 !bg-opacity-20 !text-app-grey-100 !placeholder:text-app-grey-100 focus:!border-app-grey-200 hover:!border-app-grey-200 hover:drop-shadow-none focus:!drop-shadow-none h-10",
          className || ""
        )}
      />
    </form>
  );
};

export default Search;
