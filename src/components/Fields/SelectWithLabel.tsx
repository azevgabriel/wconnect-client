import { ErrorMessage } from "@hookform/error-message";
import {
  DetailedHTMLProps,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export interface Option {
  value: string;
  label: string;
}

export interface SelectWithLabelProps {
  name: string;
  selectProps: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  label?: {
    html: DetailedHTMLProps<
      LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >;
    children: React.ReactNode;
  };
  options: Option[];
  errors?: any;
}

export const SelectWithLabel = ({
  name,
  label,
  selectProps,
  options,
  errors,
}: SelectWithLabelProps) => {
  return (
    <div>
      {label && (
        <label
          {...label.html}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label.children}
        </label>
      )}
      <select
        {...selectProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {!!errors && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </div>
  );
};
