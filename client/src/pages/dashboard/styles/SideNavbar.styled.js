import styled from "styled-components";

const StyledSideNavbar = styled.div`
  nav {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 230px;
    background-color: var(--background3);
    display: flex;
    justify-content: start;
    align-items: center;
    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      width: 100%;

      li {
        font-size: 24px;

        cursor: pointer;
        :hover {
          background-color: var(--background2);
        }
        .link {
          color: var(--font2);
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 23px 20px;

          .icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .navbar-underlay {
    width: 230px;
  }
`;

export default StyledSideNavbar;
