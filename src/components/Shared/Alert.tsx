"use client";

import React, { useEffect } from "react";

type AlertType = "info" | "danger" | "success" | "warning";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const alertClasses = {
    info: "text-blue-800 border-blue-300 bg-blue-50",
    danger: "text-red-800 border-red-300 bg-red-50",
    success: "text-green-800 border-green-300 bg-green-50",
    warning: "text-yellow-800 border-yellow-300 bg-yellow-50",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md z-50 flex items-center p-4 mb-4 text-sm ${alertClasses[type]} border rounded-lg shadow-lg`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Alert;
