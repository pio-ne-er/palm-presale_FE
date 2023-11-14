import { useContext } from "react";
import { keyframes, styled, css } from "styled-components";

import { H4 } from "@features/font";
import { Icon } from "@features/icon";
import { ToastInfoProps, ToastSettingProps } from "utilities";
import { HoverContext } from "@features/contexts";
import { useTimeout } from "@features/hooks";

interface StyleToastProps {
  $type: boolean;
  $time: number;
  $auto: boolean;
  $position: string;
}

const ToastToLeftAutoAnim = keyframes`
0% {transform: translateX(140%)}
20% {transform: translateX(0)}
80% {transform: translateX(0)}
100% {transform: translateX(140%)}
`;

const ToastToRightAutoAnim = keyframes`
0% {transform: translateX(-140%)}
20% {transform: translateX(0)}
80% {transform: translateX(0)}
100% {transform: translateX(-140%)}
`;

const ToastToLeftAnim = keyframes`
from {transform: translateX(140%)}
to {transform: translateX(0)}`;

const ToastToRightAnim = keyframes`
from {transform: translateX(-140%)}
to {transform: translateX(0)}`;

const StyleToast = styled.div<StyleToastProps>`
  position: relative;
  ${(props) =>
    props.$position === "top-right"
      ? "top: 0; right: 0;"
      : props.$position === "top-left"
      ? "top: 0; left: 0;"
      : props.$position === "bottom-right"
      ? "bottom: 0; right: 0;"
      : "bottom: 0; left: 0;"}
  z-index: 5;
  min-width: 254px;
  max-width: 500px;
  padding: ${(props) => (props.$auto ? "16px" : "36px")};
  margin: 10px 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  background: ${(props) =>
    props.$type
      ? "linear-gradient(90deg, #1E5857 0%, #1A3C3B 98.03%)"
      : "linear-gradient(90deg, #831A14 0%, #4D1109 100%)"};
  animation: ${(props) =>
      props.$auto
        ? css`
            ${props.$position === "top-right" ||
            props.$position === "bottom-right"
              ? ToastToLeftAutoAnim
              : ToastToRightAutoAnim} ${props.$time}s
          `
        : css`
            ${props.$position === "top-right" ||
            props.$position === "bottom-right"
              ? ToastToLeftAnim
              : ToastToRightAnim} 0.4s
          `}
    cubic-bezier(0.85, 0.13, 0.23, 1.235);
`;

const StyleCloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function Toast({
  toast,
  setting,
  close,
}: {
  toast: ToastInfoProps;
  setting: ToastSettingProps;
  close: () => void;
}) {
  const { setHover } = useContext(HoverContext);
  useTimeout({ callback: close, delay: setting.time, auto: setting.auto });

  return (
    <StyleToast
      $type={toast.state}
      $time={setting.time}
      $auto={setting.auto}
      $position={setting.position}
    >
      <Icon name={toast.state ? "Check" : "Mark"} size="xs" color="white" />
      <H4 $weight="500" color="white">
        {toast.title}
      </H4>
      {!setting.auto && (
        <StyleCloseButton
          onMouseEnter={() => setHover("Close Button")}
          onMouseLeave={() => setHover("")}
          onClick={close}
        >
          <Icon name="Close" size="xxs" color="white" />
        </StyleCloseButton>
      )}
    </StyleToast>
  );
}
