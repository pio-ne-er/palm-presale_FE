import { styled } from "styled-components";

export const TransferWrapper = styled.div`
  width: 784px;
  padding: 0 60px;
  font-size: 20px;
  @media only screen and (max-width: 784px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    .btn {
      /* left: calc(25% + 100px) !important; */
    }
    p {
      width: fit-content;
      margin-left: 0px !important;
    }
    .criteria {
        padding-left: 0px !important;
        margin-right: 10px;
        flex-direction: column;
        align-items: center;
    }
    .address {
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
    .qr-sign {
        margin-top: 20px !important;
    }
  }
  p {
    margin: 30px 0;
    font-size: 20px;
    text-wrap: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    span {
      text-overflow: ellipsis;
    }
  }
  .send-form {
    display: flex;
    justify-content: center;
  }
  .send-form > div {
    position: relative;
    width: 265px;
  }
  .btn-container {
    width: 155px;
    height: 35px;
    border: 1px solid black;
    border-radius: 17.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-family: 'Bryndan Write';
    color: black;
  }
  .value {
    background-color: #b8babf;
    /* margin-left: 33%; */
  }
  .amount {
    width: 100px;
    font-family: 'Bryndan Write';
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;
  }
  ::placeholder {
    color: black;
    font-family: 'Bryndan Write';
  }
  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: red !important;
    color: fieldtext !important;
}
  .btn {
    position: absolute;
    top: 0px;
    /* left: calc(33% + 100px); */
    left: 110px;
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgba(255, 87, 87, 1) 0%,
      rgba(140, 82, 255, 1) 100%
    );
  }
  
  .address {
    display: flex;
    max-width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 47px 57px 0 57px;
    padding: 0 40px;
    background: linear-gradient(rgb(255 255 255), rgb(255 255 255)) padding-box padding-box, linear-gradient(to right, #ff5757, #8c52ff) border-box border-box;
    border: 2px solid transparent;
    border-radius: 19.5px;
  }
  .des-account {
    line-height: 39px;
    background-color: transparent;
    color: black;
    font-size: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .criteria {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    margin: 40px 0 45px 0;
  }
  ul {
    margin: 0px;
    font-size: 20px;
  }
  li {
    line-height: 25px;
  }
  .qr-sign {
    width: 168px;
    height: 168px;
  }
`;
