import { createContext } from "react";
import { ToastSettingProps } from "utilities";

export const ToastContext = createContext<{
  open: (content: { title: string; state: boolean }) => void;
  position: (content: ToastSettingProps) => void;
}>({ open: () => {}, position: () => {} });
