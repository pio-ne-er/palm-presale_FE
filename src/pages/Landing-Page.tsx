import { styled } from "styled-components";
import { useRef } from "react";

import { useScrollPosition } from "@features/hooks";
import { LPHeader } from "@features/ui/lp";
import { MainButton, ScrollDownButton } from "@features/buttons";
import { H1, H2, H6 } from "@features/font";
import styles from "./Landing-Page.module.css";
import video from "../assets/video/landing.mp4";
import { Landing_Page_Intet } from "utilities";
import { LPCard } from "@features/cards";

interface PageProps {
  $position: boolean;
}

const LPPage = styled.div<PageProps>`
  position: relative;
  z-index: 2;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    transition: all 0.4s ease-in-out;
    background: linear-gradient(180deg, #1f1b18 0%, #393028 100%);
    mix-blend-mode: ${(props) => (props.$position ? "normal" : "multiply")};
    opacity: ${(props) => (props.$position ? "0.7" : "0")};
  }
`;

const StyleVideo = styled.video`
  position: fixed;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
`;

const StyleH2 = styled(H2)`
  margin: 16px 0 40px;
`;

const StyleButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyleCardDiv = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyleBottomText = styled(H1)`
  text-align: center;
  margin: 48px 0;
`;

const StyleFooter = styled.div`
  position: relative;
  z-index: 10;
  margin: 0 36px;

  @media only screen and (max-width: 800px) {
    margin: 0 16px;
  }

  border-top: 1px solid #ffffff99;

  padding: 12px 0;
`;

const StyleH6 = styled(H6)`
  text-align: center;
`;

const openWhitePaper = () => {
  window.open("https://www.pioneerlegends.com/", "rel=noopener noreferrer");
};

export default function LandingPage() {
  const { y } = useScrollPosition();

  const videoRef = useRef<HTMLVideoElement>(null);

  const MoveDown = () => {};

  return (
    <>
      <LPHeader position={y > 10} />
      <StyleVideo ref={videoRef} autoPlay playsInline loop muted src={video} />
      <LPPage $position={y > 50}>
        <div className={styles.lp_scroll}>
          <ScrollDownButton
            className="scroll_button_position"
            onClick={MoveDown}
          />
        </div>
        <div className={styles.lp_contain}>
          <H1 $weight="400" color="white">
            About
          </H1>
          <StyleH2 color="#E1E4CD" $weight="500">
            Welcome to Pioneer Legends, where the Old Wild West meets the New.
            <br />
            This is a world full of lawlessness, euphoria, and degeneracy...{" "}
          </StyleH2>
          <StyleButtonDiv>
            <MainButton
              width={142}
              title={"See Whitepaper"}
              color="white"
              main={false}
              onClick={openWhitePaper}
            />
            <StyleCardDiv>
              {Landing_Page_Intet.map((item) => (
                <LPCard
                  url={item.image}
                  title={item.title}
                  description={item.description}
                  key={item.title}
                />
              ))}
            </StyleCardDiv>
            <StyleBottomText color="white" $weight="400">
              You should feel right at home.
            </StyleBottomText>
            <MainButton
              width={142}
              title={"See Whitepaper"}
              color="white"
              main={false}
              onClick={openWhitePaper}
            />
          </StyleButtonDiv>
        </div>
        <StyleFooter>
          <StyleH6 $weight="500" color="#ffffff99">
            © 2023 Aion Ventures
          </StyleH6>
        </StyleFooter>
      </LPPage>
    </>
  );
}
