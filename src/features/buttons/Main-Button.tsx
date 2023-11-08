import { H1 } from "@features/font";
import { styled } from "styled-components";

export const MainButton = ({
  width,
  main = false,
  disable = false,
  title,
  color,
}: {
  width: number;
  main?: boolean;
  disable?: boolean;
  title: string;
  color: string;
}) => {
  const ButtonEffect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${
      main
        ? "linear-gradient(90deg, transparent 10%, #00f2ff 50%, transparent 90%), linear-gradient(90deg, transparent 10%, #00f2ff 50%, transparent 90%);"
        : "linear-gradient(90deg, transparent 10%, #DBF8FC 50%, transparent 90%), linear-gradient(90deg, transparent 10%, #DBF8FC 50%, transparent 90%);"
    }   
    background-position: 0 0, 0 100%;
    background-size: 100% 3px, 100% 3px;
    background-repeat: no-repeat, no-repeat;
    object-position: center;
    transform: scaleX(0);
    transition: all 0.2s ease-in-out;
  `;

  const Button = styled.div`
    width: ${width}px;
    filter: drop-shadow(4px 4px 0 #1e1915);
    transition: all 0.2s ease-in-out;
    opacity: ${disable ? "0.35;" : "1;"}

    &:active {
        ${!disable && "filter: none;"}
    }
  `;

  const MainBord = styled.div`
    width: ${width}px;
    height: 40px;
    background: ${
      main
        ? "linear-gradient(180deg, #376f73 0%, #3c433c 100%);"
        : "linear-gradient(180deg, #647475 0%, #30353D 100%);"
    }
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
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:before,
    &:active:before {
      background: ${
        main
          ? "linear-gradient(-45deg, transparent 25%, #3e777a 25%, #3e777a 50%, transparent 50%), linear-gradient(180deg, #3e777a 0, #3e777a 100%), linear-gradient(45deg, transparent 25%, #3e777a 25%, #3e777a 50%, transparent 50%), linear-gradient(180deg, #3e777a 0, #3e777a00 80%), linear-gradient(180deg, #3e777a 0, #3e777a00 80%);"
          : "linear-gradient(-45deg, transparent 25%, #454A52 25%, #454A52 50%, transparent 50%), linear-gradient(180deg, #454A52 0, #454A52 100%), linear-gradient(45deg, transparent 25%, #454A52 25%, #454A52 50%, transparent 50%), linear-gradient(180deg, #454A52 0, #454A5200 80%), linear-gradient(180deg, #454A52 0, #454A5200 80%);"
      }
      background-position: 0 0, 6px 0, 100% 0, 100% 6px, 0 6px;
      background-size: 6px 6px, calc(100% - 12px) 3px, 6px 6px,
        3px calc(100% - 12px), 3px calc(100% - 12px);
      background-repeat: no-repeat, no-repeat;
    }

    &:hover {
        ${
          !disable &&
          `
        background: ${
          main
            ? "linear-gradient(180deg, #29a3a9 0%, #3c433c 100%);"
            : "linear-gradient(180deg, #7F99A1 0%, #30353D 100%);"
        }
  
        ${ButtonEffect} {
          transform: scaleX(1);
        }

        `
        }
    }

    &:hover:before {
        ${!disable && "background: transparent;"}
    }

    &:active {
        ${
          !disable &&
          `
        background: ${
          main
            ? "linear-gradient(180deg, #376f73 0%, #3c433c 100%);"
            : "linear-gradient(180deg, #647475 0%, #30353D 100%);"
        }
      transform: translate(4px, 4px);

      ${ButtonEffect} {
        transform: scaleX(0);
      }
        `
        }
    }
  `;

  const BorderEffect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &:before, &:after {
        background: ${
          main
            ? "linear-gradient(180deg, #3b4c48 0%, rgba(59, 76, 72, 0) 100%);"
            : "linear-gradient(180deg, #181A1D 0%, rgba(75, 72, 69, 0) 100%);"
        }
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
  `;

  return (
    <Button>
      <MainBord>
        <BorderEffect />
        <ButtonEffect />
        <H1 color={color} weight="600">
          {title}
        </H1>
      </MainBord>
    </Button>
  );
};
