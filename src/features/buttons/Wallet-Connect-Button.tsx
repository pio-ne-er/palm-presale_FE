import { useContext } from "react";
import { styled } from "styled-components";

import { HoverContext } from "@features/contexts";
import { Icon } from "@features/icon";
import { IconNames } from "@features/icon/icons";
import { H4 } from "@features/font";

const StyleButton = styled.div`
  width: 100%;
  padding: 12px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;
  position: relative;
  z-index: 5;
  background: transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #fff2;
  }
`;

export const WalletConnectButton = ({
  type,
  onClick,
}: {
  type: IconNames;
  onClick: () => void;
}) => {
  const { setHover } = useContext(HoverContext);

  return (
    <StyleButton
      onMouseEnter={() => setHover("Wallet_Provider_Button")}
      onMouseLeave={() => setHover("")}
      onClick={onClick}
    >
      <Icon name={type} color="white" size="xs" />
      <H4 color="white" $weight="500">
        {type}
      </H4>
    </StyleButton>
  );
};
