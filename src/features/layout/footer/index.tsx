import styled from "styled-components";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 37px;
  border-top: 2px solid black;
  padding-top: 25px;
  padding-bottom: 27px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    border: 2px solid #C84DE6;
    border-radius: 23px;
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <a><FaTelegramPlane size={28} color="#C84DE6"/></a>
      <a><FaXTwitter size={28} color="#C84DE6"/></a>
    </FooterWrapper>
  );
};
