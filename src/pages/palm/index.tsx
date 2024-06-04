import styled from "styled-components";
import { Banner, Introduction, Supply, Transfer } from "../../features";

export const PalmWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Palm = () => {
  return (
    <PalmWrapper>
      <Banner />
      <Introduction />
      <Transfer />
      <Supply />
    </PalmWrapper>
  );
};
