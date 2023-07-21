import styled from "styled-components";

const StyledProfileNavbar = styled.div`
  border-bottom: 1px solid var(--background1);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: var(--background3);
  color: var(--font2);

  .parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .navbar-overlay {
    background-color: var(--background5);
    opacity: 0.75;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .buttons {
    display: flex;
    border: var(--background3);
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
  }
`;

export default StyledProfileNavbar;
