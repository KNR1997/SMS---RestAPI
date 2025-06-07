import { Controller } from "react-hook-form";
import { GetOptionLabel } from "react-select";
import Select from "./select/select";

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  getOptionLabel?: GetOptionLabel<unknown>;
  getOptionValue?: GetOptionLabel<unknown>;
  isMulti?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: unknown;
  placeholder?: string;
  required?: boolean;
  label?: string;
  toolTipText?: string;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  disabled,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  label,
  required,
  toolTipText,
  ...rest
}: SelectInputProps) => {
  return (
    <>
      {/* {label ? (
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
        />
      ) : (
        ''
      )} */}
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            options={options}
            isDisabled={disabled as boolean}
            styles={{
              multiValueLabel: (base) => ({
                ...base,
                color: "black", // Ensure text is visible
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#e5e7eb", // Tailwind's gray-200
              }),
            }}
          />
        )}
      />
    </>
  );
};

export default SelectInput;
