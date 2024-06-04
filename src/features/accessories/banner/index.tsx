import styled from "styled-components";

export const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  img {
    width: 320px;
    margin-bottom: 20px;
  }
  a {
    font-size: 18px;
    text-decoration: none;
    padding: 8px 23px;
    background: linear-gradient(90deg, rgba(255, 87, 87, 1) 0%, rgba(140, 82, 255, 1) 100%);
    color: white;
    border: 1px solid black;
    border-radius: 18px;
  }
  @media only screen and (max-width: 480px) {
    img {
      width: 250px;
    }
  }
`;

export const Banner = () => {
  return (
    <BannerWrapper>
      <img src="img/Flat_Flip.png" alt="banner_img" />
      <a href="#">
        Test prototype
      </a>
    </BannerWrapper>
  );
};

// 784, 283
