import styled from "styled-components";

const StyledProfileNavbar = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #eee;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  .parent {
    width: 80%;
    height: 100%;
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
    .follow {
      svg {
        color: #00b2b2;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    button {
      margin: 0 1rem;
      .btn-text {
        display: none;
      }
      .icon {
        font-size: 20px;
      }
    }
    .parent {
      width: 100%;
    }
  }
`;

export default StyledProfileNavbar;
