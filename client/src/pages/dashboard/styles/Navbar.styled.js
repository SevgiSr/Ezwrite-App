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

    #search-form {
      height: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      margin-left: 30px;

      button {
        border: none;
        font-size: 23px;
        color: var(--font2);
        padding: 5px 7px;

        border-radius: 100%;
        :hover {
          background-color: var(--background4);
        }
      }

      input {
        padding: 9px 13px;
        border-radius: 9px;
        width: 270px;
        background-color: var(--background1);
        color: var(--font1);

        ::placeholder {
          color: var(--font2);
          font-size: 15px;
          font-weight: 500;
        }
      }
      .modal-search-form {
        background-color: var(--background5);
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
        padding: 10px 0;
        border-radius: 10px;
        position: absolute;
        left: 0;
        width: 330px;
        display: flex;
        z-index: 999;
        input {
          display: block;
        }
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
          font-size: 26px;
          color: var(--font2);
          display: block;
          text-decoration: none;
          padding: 5px 23px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
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

  #search-form input {
    border: none;
    margin-left: 5px;
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
    .nt-count {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ff6122;
      width: 17px;
      height: 17px;
      color: #fff;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
  @media only screen and (max-width: 1280px) {
    #search-form {
      input {
        display: none;
      }
      button {
        background-color: var(--background5);
      }
    }
  }
`;

export default StyledNavbar;
