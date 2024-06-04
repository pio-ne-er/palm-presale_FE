import styled from "styled-components";
import { BlackLine } from "../../ui";

export const IntroWrapper = styled.div`
  width: 784px;
  margin-bottom: 50px;
  padding: 0 60px;
  @media only screen and (max-width: 784px) {
    width: 100%;
    padding: 0 20px;
    .intro-container {
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }
    .intro-container > div {
      max-width: 600px !important;
    }
  }
  .img-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  img {
    height: 138px;
  }
  .intro-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  .intro-container > div {
    max-width: 305px;
  }
  h3 {
    font-size: 20px;
    font-weight: 300;
    margin: 32px 0;
  }
  p {
    margin: 0px;
    font-size: 16.5px;
    color: black;
    bottom: 0px;
    line-height: 130%;
  }
`;

export const Introduction = () => {
  return (
    <IntroWrapper>
      <div className="intro-container">
        <div>
          <div className="img-container">
            <img src="img/trip.png" alt="trip" className="trip" />
          </div>
          <h3>What is Flat Flip?</h3>
          <p>
            Flat Flip offers a user-friendly real estate platform that enables
            sharing living spaces and earning secure, sustainable income through
            cryptocurrency.
            <br />
            <br />
            Landlords and hosts have the option to receive their earnings
            directly into their wallets.
            <br />
            <br />
            Tenants and guests can pay in fiat to ensure a broad range of users.
            <br />
            <br />
            Our goal is to promote the mass adoption of blockchain technology,
            creating a fair and just world for everyone.
          </p>
        </div>
        <div>
          <div className="img-container">
            <img src="img/tree.png" alt="tree" className="tree" />
          </div>
          <h3>What you can do with $PALM?</h3>
          <p>
            Staking & Revenue Sharing with $PALM
            <br />
            <br />
            Users can stake $PALM to earn points.
            <br />
            <br />
            Points can then be redeemed for a revenue share of the Flat Flip
            platform. (official Solanas AirBnB)
            <br />
            <br />
            When using $PLAM for payments on Flat Flip, the tokens are burned.
            This is done to ensure that advertisers are paid in fiat, leading to
            a deflationary token economy.
            <br />
            <br />
            We offer the best utility in the space, combined with a real-world
            use case.
          </p>
        </div>
      </div>
      <BlackLine />
    </IntroWrapper>
  );
};
