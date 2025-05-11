"use client";

import Alert from "@/components/Shared/Alert";
import { createContext, ReactNode, useContext, useState } from "react";

type AlertType = "info" | "danger" | "success" | "warning";

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
  alert: { type: AlertType | null; message: string | null };
}

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    type: AlertType | null;
    message: string | null;
  }>({ type: null, message: null });

  const onClose = () => {
    setAlert({ type: null, message: null });
  };

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alert }}>
      {children}
      {alert.message && alert.type && (
        <Alert
          onClose={onClose}
          type={alert.type}
          message={alert.message}
          key="global-alert"
        />
      )}
    </AlertContext.Provider>
  );
};

const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};

export { AlertProvider, useAlert };
