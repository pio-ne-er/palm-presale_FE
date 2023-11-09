import { HoverContext } from "@features/contexts";
import { H3, H4 } from "@features/font";
import { useContext } from "react";
import { styled } from "styled-components";

interface ButtonProps {
  $w?: number;
  $sm?: boolean;
  $main?: boolean;
  $disable?: boolean;
}

const ButtonEffect = styled.div<ButtonProps>`
  ${(props) =>
    !props.$sm &&
    `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${
      props.$main
        ? "linear-gradient(90deg, transparent 10%, #00f2ff 50%, transparent 90%), linear-gradient(90deg, transparent 10%, #00f2ff 50%, transparent 90%)"
        : "linear-gradient(90deg, transparent 10%, #DBF8FC 50%, transparent 90%), linear-gradient(90deg, transparent 10%, #DBF8FC 50%, transparent 90%)"
    };
    background-position: 0 0, 0 100%;
    background-size: 100% 3px, 100% 3px;
    background-repeat: no-repeat, no-repeat;
    object-position: center;
    transform: scaleX(0);
    transition: all 0.2s ease-in-out;
  `}
`;

const Button = styled.div<ButtonProps>`
  width: ${(props) => props.$w}px;
  filter: ${(props) =>
    props.$sm
      ? "drop-shadow(1px 1px 0 #1e1915)"
      : "drop-shadow(4px 4px 0 #1e1915)"};
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.$disable ? "0.35" : "1")};

  &:active {
    ${(props) => !props.$disable && "filter: none;"}
  }
`;

const MainBord = styled.div<ButtonProps>`
  width: ${(props) => props.$w}px;
  height: ${(props) => (props.$sm ? "24px" : "40px")};
  background: ${(props) =>
    props.$main
      ? "linear-gradient(180deg, #376f73 0%, #3c433c 100%)"
      : "linear-gradient(180deg, #647475 0%, #30353D 100%)"};
  -webkit-clip-path: polygon(
    6px 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    6px 100%,
    0 calc(100% - 6px),
    0 6px
  );
  clip-path: polygon(
    6px 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    6px 100%,
    0 calc(100% - 6px),
    0 6px
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &:before,
  &:active:before {
    background: ${(props) =>
      props.$main
        ? "linear-gradient(-45deg, transparent 30%, #3e777a 30%, #3e777a 50%, transparent 50%),linear-gradient(180deg, #3e777a 0, #3e777a 100%),linear-gradient(45deg, transparent 30%, #3e777a 30%, #3e777a 50%, transparent 50%),linear-gradient(180deg, #3e777a 0, #3e777a00 80%),linear-gradient(180deg, #3e777a 0, #3e777a00 80%)"
        : "linear-gradient(-45deg, transparent 25%, #454a52 25%, #454a52 50%, transparent 50%), linear-gradient(180deg, #454a52 0, #454a52 100%), linear-gradient(45deg, transparent 25%, #454a52 25%, #454a52 50%, transparent 50%), linear-gradient(180deg, #454a52 0, #454a5200 80%), linear-gradient(180deg, #454a52 0, #454a5200 80%)"};
    background-position: ${(props) =>
      !props.$sm
        ? "0 0, 6px 0, 100% 0, 100% 6px, 0 6px"
        : "0 0, 3px 0, 100% 0, 100% 3px, 0 3px"};
    background-size: ${(props) =>
      !props.$sm
        ? "6px 6px, calc(100% - 12px) 3px, 6px 6px, 3px calc(100% - 12px), 3px calc(100% - 12px)"
        : "6px 6px, calc(100% - 6px) 2px, 6px 6px, 2px calc(100% - 6px), 2px calc(100% - 6px)"};
    background-repeat: no-repeat, no-repeat;
  }

  &:hover {
    ${(props) =>
      !props.$disable &&
      `
        background: ${
          props.$main
            ? "linear-gradient(180deg, #29a3a9 0%, #3c433c 100%)"
            : "linear-gradient(180deg, #7F99A1 0%, #30353D 100%)"
        };
  
        ${ButtonEffect} {
          transform: scaleX(1);
        }

        `}
  }

  &:hover:before {
    ${(props) => !props.$disable && "background: transparent;"}
  }

  &:active {
    ${(props) =>
      !props.$disable &&
      `
        background: ${
          props.$main
            ? "linear-gradient(180deg, #376f73 0%, #3c433c 100%)"
            : "linear-gradient(180deg, #647475 0%, #30353D 100%)"
        };

        transform: ${
          !props.$sm ? "translate(4px, 4px)" : "translate(1px, 1px)"
        };

      ${ButtonEffect} {
        transform: scaleX(0);
      }
        `}
  }
`;

const BorderEffect = styled.div<ButtonProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) =>
    !props.$sm &&
    `
    &:before, &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

    &:before,
    &:after {
      background: ${
        props.$main
          ? "linear-gradient(180deg, #3b4c48 0%, rgba(59, 76, 72, 0) 100%)"
          : "linear-gradient(180deg, #181A1D 0%, rgba(75, 72, 69, 0) 100%)"
      };
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) inset;
    }

    &:before {
      -webkit-clip-path: polygon(
        0 calc(50% - 5px),
        2.5px calc(50% - 8px),
        8px 50%,
        2.5px calc(50% + 8px),
        0 calc(50% + 5px)
      );
      clip-path: polygon(
        0 calc(50% - 5px),
        2.5px calc(50% - 8px),
        8px 50%,
        2.5px calc(50% + 8px),
        0 calc(50% + 5px)
      );
    }

    &:after {
      -webkit-clip-path: polygon(
        100% calc(50% - 5px),
        calc(100% - 2.5px) calc(50% - 8px),
        calc(100% - 8px) 50%,
        calc(100% - 2.5px) calc(50% + 8px),
        100% calc(50% + 5px)
      );
      clip-path: polygon(
        100% calc(50% - 5px),
        calc(100% - 2.5px) calc(50% - 8px),
        calc(100% - 8px) 50%,
        calc(100% - 2.5px) calc(50% + 8px),
        100% calc(50% + 5px)
      );
    }
    `}
`;

export const MainButton = ({
  width,
  small = false,
  main = true,
  disable = false,
  title,
  color,
}: {
  width: number;
  small?: boolean;
  main?: boolean;
  disable?: boolean;
  title: string;
  color: string;
}) => {
  const { setHover } = useContext(HoverContext);

  return (
    <Button
      $sm={small}
      $disable={disable}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MainBord $w={width} $sm={small} $main={main} $disable={disable}>
        <BorderEffect $sm={small} $main={main} />
        <ButtonEffect $sm={small} $main={main} />
        {small ? (
          <H4 color={color} $weight="500">
            {title}
          </H4>
        ) : (
          <H3 color={color} $weight="600">
            {title}
          </H3>
        )}
      </MainBord>
    </Button>
  );
};
