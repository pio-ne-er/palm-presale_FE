import styled from "styled-components";

export const SupplyWrapper = styled.div`
  padding: 0 60px;
  width: 784px;
  @media only screen and (max-width: 784px) {
    width: 100%;
    padding: 0 10px;
  }
  p {
    color: black;
    font-size: 22px;
    line-height: 31px;
  }
  .economics {
    font-size: 20px;
  }
  .supply {
    text-align: center;
    margin: 25px 0;
  }
  .total-supply {
    color: #C84DE6;
  }
`;

export const Supply = () => {
  return (
    <SupplyWrapper>
      <p className="economics">Palm-economics</p>
      <p className="supply">
        <span className="total-supply">total supply: 100,000,000M</span>
        <br />
        <br />
        Ecosystem 30%
        <br />
        official sale 30%
        <br />
        presale 10%
        <br />
        team 3%
        <br />
        legal & advisor 2%
        <br />
        LP% 25%
        <br />
      </p>
    </SupplyWrapper>
  );
};
