import styled from "styled-components";

const StyledProfileNavbar = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 5px rgb(120 120 120 / 50%);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  .parent {
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .navbar-overlay {
    background-color: #fff;
    opacity: 0.75;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .buttons {
    display: flex;
    .following {
      background-color: #fff;
      color: #00b2b2;
    }
    .follow {
      background-color: #00b2b2;
      color: #fff;
    }
  }

  @media only screen and (max-width: 1000px) {
    button {
      .btn-text {
        display: none;
      }
      .icon {
        font-size: 20px;
      }
    }
    .parent {
      width: 95%;
    }
  }
`;

export default StyledProfileNavbar;
