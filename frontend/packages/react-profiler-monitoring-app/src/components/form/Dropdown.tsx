import { FC } from "react";
import { Listbox } from "@headlessui/react";

type DropdownProps = {
  label: string;
  options: (string | null)[];
  value: string | null;
  onChange: (value: string | null) => void;
};

export const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <Listbox value={value} onChange={onChange}>
        <div className="relative w-48">
          <Listbox.Button className="w-full rounded bg-neutral-900 p-1 text-left focus:outline-none">
            {value || "All"}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full rounded bg-neutral-900 shadow-lg focus:outline-none">
            <Listbox.Option key="" value={null}>
              {({ active }) => (
                <div
                  className={`cursor-pointer py-2 px-3 ${
                    active ? "bg-neutral-700" : ""
                  }`}
                >
                  All
                </div>
              )}
            </Listbox.Option>
            {options
              .filter((opt) => opt)
              .map((option) => (
                <Listbox.Option key={option} value={option}>
                  {({ active }) => (
                    <div
                      className={`cursor-pointer py-2 px-3 ${
                        active ? "bg-neutral-700" : ""
                      }`}
                    >
                      {option}
                    </div>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
