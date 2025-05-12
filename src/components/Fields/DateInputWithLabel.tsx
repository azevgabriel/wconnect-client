import { ErrorMessage } from "@hookform/error-message";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

export interface DateInputProps {
  name: string;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: {
    html: DetailedHTMLProps<
      LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >;
    children: React.ReactNode;
  };
  errors?: any;
}

export const DateInputWithLabel = ({
  name,
  inputProps,
  label,
  errors,
}: DateInputProps) => {
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
      <input
        {...inputProps}
        type="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
      {!!errors && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </div>
  );
};
