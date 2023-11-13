import { useContext } from "react";

import { ToastContext } from "./Toast-Context";

export const useToast = () => useContext(ToastContext);
