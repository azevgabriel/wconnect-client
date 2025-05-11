import React, { DetailedHTMLProps } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps {
  htmlProps?: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  loading?: boolean;
  children: React.ReactNode;
  type?: "primary" | "link" | "danger";
}

const CLASS_NAME_MAP = (disabled?: boolean) => ({
  primary: `text-white bg-primary-400 ${
    disabled ? "" : "hover:bg-primary-500"
  } focus:ring-4 focus:ring-primary-300 rounded-lg focus:outline-none`,
  link: `text-gray-900 ${disabled ? "" : "hover:text-blue-700"}`,
  danger: `text-white bg-red-600 ${
    disabled ? "" : "hover:bg-red-700"
  } focus:ring-4 focus:ring-primary-300 rounded-lg focus:outline-none`,
});

export const Button = ({
  loading,
  htmlProps,
  children,
  type = "primary",
}: ButtonProps) => {
  return (
    <button
      type={htmlProps?.type || "button"}
      className={`${
        CLASS_NAME_MAP(htmlProps?.disabled)[type]
      } px-2 py-2.5 text-center  ${
        htmlProps?.disabled || loading
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
      disabled={htmlProps?.disabled || loading}
      onClick={htmlProps?.onClick}
    >
      {loading ? (
        <div className="flex justify-center ">
          <div className="flex-none pr-2">
            <Spinner scale={0.8} />
          </div>
          <div className="flex-none">{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
