import { useState, useMemo, ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { ToastInfoProps, ToastSettingProps } from "utilities";
import Toast from "./Toast";
import { ToastContext } from "./Toast-Context";

interface StyleBoardProps {
  $position: string;
}

const StyleBoard = styled.div<StyleBoardProps>`
  position: fixed;
  z-index: 999999;
  ${(props) =>
    props.$position === "top-right"
      ? "top: 90px; right: 50px"
      : props.$position === "top-left"
      ? "top: 90px; left: 50px"
      : props.$position === "bottom-right"
      ? "bottom: 90px; right: 50px"
      : "bottom: 90px; left: 50px"};
`;

const generateUEID = () => {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;

  return (
    ("000" + first.toString(36)).slice(-3) +
    ("000" + second.toString(36)).slice(-3)
  );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Array<ToastInfoProps>>([]);
  const [toastSetting, setToastSetting] = useState<ToastSettingProps>({
    position: "",
    auto: false,
    time: 0,
  });

  const position = (content: ToastSettingProps) => {
    setToastSetting(content);
  };

  const open = (content: { title: string; state: boolean }) =>
    setToasts((current) => [
      ...current,
      { id: generateUEID(), title: content.title, state: content.state },
    ]);

  const close = (id: string) =>
    setToasts((current) => current.filter((toast) => toast.id !== id));

  const contextValue = useMemo(() => ({ open, position }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <StyleBoard $position={toastSetting.position}>
          {toasts.map((toast) => (
            <Toast
              toast={toast}
              setting={toastSetting}
              close={() => close(toast.id)}
              key={toast.id}
            />
          ))}
        </StyleBoard>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
