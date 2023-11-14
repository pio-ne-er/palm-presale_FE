import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { H1, H3 } from "@features/font";

const CardMain = styled.div`
  width: 965px;
  height: 360px;

  @media only screen and (max-width: 1024px) {
    width: 360px;
    height: 360px;
  }

  position: relative;
  background: rgba(30, 25, 21, 0.85);

  &:before {
    position: absolute;
    content: "";
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: linear-gradient(180deg, #1f1b18 0%, #393028 100%);
    box-shadow: 1px 1px 2px 0px #37322f inset;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.8));
  }
`;

const Board = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  display: grid;
  grid-template-columns: 344px auto;
  gap: 9px;
`;

const Notic = styled.div`
  padding: 64px 51px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 36px;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const UpdateH2 = styled(H3)`
  white-space: break-spaces;
`;

const StyleBottomDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:before {
    position: absolute;
    bottom: -7px;
    left: 0;
    top: 0;
    right: -3px;
    content: "";
    background-image: url("src/assets/bottom.png");
    background-repeat: no-repeat;
    background-position: bottom right;
  }

  &:after {
    position: absolute;
    bottom: -7px;
    left: -3px;
    top: 0;
    right: 0;
    content: "";
    background-image: url("src/assets/bottom.png");
    background-repeat: no-repeat;
    background-position: bottom right;
    transform: rotateY(180deg);
  }
`;
const StyleTopDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:before {
    position: absolute;
    top: -5px;
    left: 0;
    bottom: 0;
    right: -3px;
    content: "";
    background-image: url("src/assets/top.png");
    background-repeat: no-repeat;
    background-position: top right;
  }

  &:after {
    position: absolute;
    top: -5px;
    left: -3px;
    bottom: 0;
    right: 0;
    content: "";
    background-image: url("src/assets/top.png");
    background-repeat: no-repeat;
    background-position: top right;
    transform: rotateY(180deg);
  }
`;

export const LPCard = ({
  url,
  title,
  description,
}: {
  url: string;
  title: string;
  description: string;
}) => {
  return (
    <CardMain>
      <Board>
        <LazyLoadImage
          alt="Banner"
          effect="blur"
          src={url}
          width={344}
          height={344}
        />
        <Notic>
          <H1 color="white" $weight="500">
            {title}
          </H1>
          <UpdateH2 color="#E1E4CD" $weight="500">
            {description}
          </UpdateH2>
        </Notic>
      </Board>
      <StyleBottomDecoration />
      <StyleTopDecoration />
    </CardMain>
  );
};
