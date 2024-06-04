import styled from "styled-components";
import { FC } from "react";
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 87px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  .banner {
    max-width: 784px;
    width: 784px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
    }
    p {
      margin: 0 0 0 15px;
      align-content: center;
    }
  }
  @media only screen and (max-width: 784px) {
    .banner {
      width: 100%;
    }
    .logo {
      margin-left: 10px !important;
    }
    .wallet-btn {
      margin-right: 10px !important;
    }
  }
  .logo {
    margin-left: 60px;
    padding: 0px;
  }
  .page-name {
    font-size: 37px;
    text-transform: uppercase;
  }
  button {
    width: 119px;
    height: 27px;
    padding: 0px;
    /* margin: 29px 27px 26px 0; */
    background: linear-gradient(rgb(255 255 255), rgb(255 255 255)) padding-box padding-box, linear-gradient(to right, #ff5757, #8c52ff) border-box border-box;
    border: 2px solid transparent;
    border-radius: 14.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 13px;
    font-weight: bold;
    /* font-family: "NeueMontreal"; */
    cursor: pointer;
    i {
      display: none;
      margin-right: 0px;
    }
  }
`;

export const Header: FC = () => {

  return (
        <HeaderWrapper>
          <div className="banner">
            <div>
              <img src="img/Palm$-logo.png" alt="Logo" className="logo" />
              <p className="page-name">$Palm</p>
            </div>
            <WalletMultiButton />
          </div>
        </HeaderWrapper>
      );
};
