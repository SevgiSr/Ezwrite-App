import styled from "styled-components";

const StyledNavbar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--background1);
  background-color: var(--background2);
  padding: 0px 20px;
  box-sizing: border-box;

  > :nth-child(2) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .section {
    display: flex;
    align-items: center;
  }

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
  }

  button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    background-color: var(--background2);
    color: var(--font2);
  }

  #logo-and-search {
    display: flex;
    .logo {
      width: 70px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        overflow-clip-margin: content-box;
        overflow: clip;
      }
    }
  }

  #actions {
    .nav-items {
      display: flex;
      list-style: none;
      .nav-item {
        :hover {
          background-color: var(--background4);
        }
        .nav-link {
          position: relative;
          font-size: 26px;
          color: var(--font2);
          display: block;
          text-decoration: none;
          padding: 5px 23px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          .nt-count {
            position: absolute;
            font-size: 15px;
            top: 0;
            left: 3px;
            background-color: var(--accent);
            width: 17px;
            height: 17px;
            color: #fff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  #write-dropdown,
  #discover-dropdown {
    margin: 0 3em;
  }

  #discover-dropdown {
    .dropdown-items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 20px;
      align-items: center;
      justify-content: center;
      text-align: center;
      .dropdown-item {
        display: flex;
        flex-direction: column;
        > * {
          text-decoration: none;
          color: #fff;
          padding: 10px 0;
        }
        .symbol {
          font-size: 20px;
        }
      }
    }
  }

  #profile-dropdown {
    position: relative;
    .pp {
      display: flex;
      flex-direction: row;
      align-items: center;
      .username {
        margin: 0 5px;
      }
    }

    .dropdown-item {
      span {
        position: relative;
        .nt-count {
          position: absolute;
          top: -12px;
          left: -7px;
        }
      }
    }

    .dropdown-menu {
      right: 10px;
    }
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media only screen and (max-width: 540px) {
    #actions {
      .nav-items {
        .nav-item {
          .nav-link {
            font-size: 20px;
            padding: 5px 16px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    #write-dropdown,
    #discover-dropdown {
      margin: 0;
    }

    .username {
      display: none;
    }
  }
`;

export default StyledNavbar;
