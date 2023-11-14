import { HoverContext, TabContext } from "@features/contexts";
import { H4 } from "@features/font";
import { useContext } from "react";
import { styled } from "styled-components";

interface TabProps {
  $type: boolean;
}

const Tab = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: repeat(2, 120px);
`;

const ButtonEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      90deg,
      transparent 20%,
      #dbf8fc 50%,
      transparent 80%
    ),
    linear-gradient(90deg, transparent 20%, #dbf8fc 50%, transparent 80%);

  background-position: 0 0, 0 100%;
  background-size: 100% 2px, 100% 2px;
  background-repeat: no-repeat, no-repeat;
  object-position: center;
  transition: all 0.2s ease-in-out;
  transform: scaleX(0);
`;

const UpdateH = styled(H4)`
  transition: all 0.3s ease-in-out;
`;

const LeftTab = styled.div<TabProps>`
  background: ${(props) =>
    !props.$type
      ? "#2d2725"
      : "linear-gradient(180deg, #647475 0%, #24282e 100%)"};
  -webkit-clip-path: polygon(
    6px 0,
    100% 0,
    100% 100%,
    6px 100%,
    0 calc(100% - 6px),
    0 6px
  );
  clip-path: polygon(
    6px 0,
    100% 0,
    100% 100%,
    6px 100%,
    0 calc(100% - 6px),
    0 6px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${(props) =>
      props.$type
        ? "transparent"
        : "linear-gradient(180deg, #00000044 0, #00000044 100%), linear-gradient(-45deg, transparent 28%, #00000044 28%, #00000044 50%, transparent 50%)"};
    background-position: 6px 0, -3px 0;
    background-size: calc(100% - 6px) 4px, 9px 9px;
    background-repeat: no-repeat, no-repeat;
  }

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${(props) =>
      props.$type
        ? "transparent"
        : "linear-gradient(180deg, #383e47 0, #383e47 100%), linear-gradient(-45deg, transparent 40%, #383e47 40%, #383e47 50%, transparent 50%), linear-gradient(180deg, #383e47 0, #383e47 100%), linear-gradient(225deg, transparent 40%, #383e47 40%, #383e47 50%, transparent 50%), linear-gradient(180deg, #383e47 0, #383e47 100%)"};
    background-position: 6px 0, 0 0, 0 6px, 0 100%, 6px 100%;
    background-size: calc(100% - 6px) 1px, 6px 6px, 1px calc(100% - 12px),
      6px 6px, calc(100% - 6px) 1px;
    background-repeat: no-repeat, no-repeat;
  }

  &:hover {
    ${(props) =>
      props.$type &&
      `
    ${ButtonEffect} {
      transform: scaleX(1);
    }
    `}
  }

  ${UpdateH} {
    opacity: ${(props) => (props.$type ? "1" : "0.6")};
  }
`;

const RightTab = styled.div<TabProps>`
  background: ${(props) =>
    props.$type
      ? "#2d2725"
      : "linear-gradient(180deg, #647475 0%, #24282e 100%)"};
  -webkit-clip-path: polygon(
    0 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%
  );
  clip-path: polygon(
    0 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${(props) =>
      !props.$type
        ? "transparent"
        : "linear-gradient(180deg, #00000044 0, #00000044 100%), linear-gradient(45deg, transparent 28%, #00000044 28%, #00000044 50%, transparent 50%)"};
    background-position: 0 0, calc(100% + 3px) 0px;
    background-size: calc(100% - 6px) 4px, 9px 9px;
    background-repeat: no-repeat, no-repeat;
  }

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${(props) =>
      !props.$type
        ? "transparent"
        : "linear-gradient(180deg, #383e47 0, #383e47 100%), linear-gradient(45deg, transparent 40%, #383e47 40%, #383e47 50%, transparent 50%), linear-gradient(180deg, #383e47 0, #383e47 100%), linear-gradient(-225deg, transparent 40%, #383e47 40%, #383e47 50%, transparent 50%), linear-gradient(180deg, #383e47 0, #383e47 100%)"};
    background-position: 0 0, 100% 0, 100% 6px, 100% 100%, 0 100%;
    background-size: calc(100% - 6px) 1px, 6px 6px, 1px calc(100% - 12px),
      6px 6px, calc(100% - 6px) 1px;
    background-repeat: no-repeat, no-repeat;
  }

  &:hover {
    ${(props) =>
      !props.$type &&
      `
    ${ButtonEffect} {
      transform: scaleX(1);
    }
    `}
  }

  ${UpdateH} {
    opacity: ${(props) => (!props.$type ? "1" : "0.6")};
  }
`;

export const TabButton = () => {
  const { type, setType } = useContext(TabContext);
  const { setHover } = useContext(HoverContext);

  return (
    <Tab
      onMouseOver={() => setHover("Tab Button")}
      onMouseLeave={() => setHover("")}
    >
      <LeftTab
        $type={type}
        onClick={() => {
          !type && setType(true);
        }}
      >
        <ButtonEffect />
        <UpdateH color="white" $weight="500">
          Wallet (0)
        </UpdateH>
      </LeftTab>
      <RightTab
        $type={type}
        onClick={() => {
          type && setType(false);
        }}
      >
        <ButtonEffect />
        <UpdateH color="white" $weight="500">
          Staked (0)
        </UpdateH>
      </RightTab>
    </Tab>
  );
};
