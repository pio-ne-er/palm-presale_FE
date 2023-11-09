import { styled } from "styled-components";

interface HProps {
  $weight: string;
  color: string;
}

export const H1 = styled.h1<HProps>`
  font-size: 36px;
  /* line-height: 24px; */
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.color};
  margin: 0;
`;

export const H2 = styled.h2<HProps>`
  font-size: 20px;
  line-height: 36px;
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.color};
  margin: 0;
`;

export const H3 = styled.h3<HProps>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.color};
  margin: 0;
`;

export const H4 = styled.h4<HProps>`
  font-size: 12px;
  line-height: 18px;
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.color};
  margin: 0;
`;
