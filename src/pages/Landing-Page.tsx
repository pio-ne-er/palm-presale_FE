import { styled } from "styled-components";

import { useScrollPosition } from "@features/hooks";
import { LPHeader } from "@features/ui/lp";
import { ScrollDownButton } from "@features/buttons";
import styles from "./Landing-Page.module.css";
import { H1 } from "@features/font";
import { useRef } from "react";

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

const StylesVideo = styled.video`
  position: fixed;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
`;

export default function LandingPage() {
  const { y } = useScrollPosition();

  const videoRef = useRef<HTMLVideoElement>(null);

  const MoveDown = () => {};

  return (
    <>
      <LPHeader position={y > 10} />
      <StylesVideo
        ref={videoRef}
        autoPlay
        playsInline
        loop
        muted
        src="/src/assets/video/landing.mp4"
      />
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
        </div>
      </LPPage>
    </>
  );
}
