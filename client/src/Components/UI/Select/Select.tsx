import { useState } from "react";
import { Combobox } from "@headlessui/react";
import Icon from "../Icon/Icon";
import clsx from "clsx";

type OptionItem = {
  id: string | number;
  name: string;
};

type SelectProps = {
  value: OptionItem;
  onChange: () => void;
  options: OptionItem[];
};

const baseStyles =
  "rounded border text-sm text-app-grey-600 border-app-grey-200 outline-none focus:border-app-blue-200 hover:border-app-blue-200 hover:drop-shadow-md focus:drop-shadow-md py-2 pl-4 pr-12 w-80 bg-white";

const Select: React.FC<SelectProps> = ({
  value,
  onChange = () => {},
  options = [],
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={value} onChange={onChange}>
      <div>
        <Combobox.Button className="flex justify-start items-center relative">
          <Combobox.Input
            className={clsx(baseStyles, "text-sm h-10")}
            displayValue={(option: OptionItem) => option.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="absolute right-4">
            <Icon name="CaretDown" size={16} />
          </span>
        </Combobox.Button>

        <Combobox.Options
          className={clsx(
            "mt-1",
            baseStyles,
            "!px-2 max-h-60 overflow-auto !bg-white"
          )}
        >
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="cursor-default  py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className={({ active }: { active: boolean }) =>
                  `p-2 rounded cursor-default text-sm ${
                    active ? "bg-app-blue-300 text-white" : "text-gray-900"
                  }`
                }
              >
                <span className="block truncate ">{option.name}</span>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default Select;
