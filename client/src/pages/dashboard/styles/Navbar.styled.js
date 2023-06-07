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

  .section {
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

  #search-form {
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      border: none;
      font-size: 20px;
      padding: 0;
      margin: 0;
      color: var(--icons);
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
  }

  #search-form input {
    border: none;
    margin-left: 1em;
  }

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

    #search-form {
      input {
        width: auto;
      }
    }
  }
`;

export default StyledNavbar;
