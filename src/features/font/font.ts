import { styled } from "styled-components";

interface H1Props {
  weight: string;
  color: string;
}

export const H1 = styled.h1<H1Props>`
  font-size: 16px;
  font-weight: ${(props) => props.weight};
  line-height: 24px;
  color: ${(props) => props.color};
`;
