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
  }

  @media only screen and (max-width: 500px) {
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

  @media only screen and (min-width: 768px) {
    .parent {
      width: 740px;
    }
  }
  @media only screen and (min-width: 992px) {
    .parent {
      width: 960px;
    }
  }
  @media only screen and (min-width: 1350px) {
    .parent {
      width: 1160px;
    }
  }
`;

export default StyledProfileNavbar;
