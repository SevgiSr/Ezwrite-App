import styled from "styled-components";

const StyledNavbar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
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
    color: #222;
    font-size: 16px;
  }

  #write-dropdown,
  #discover-dropdown {
    margin: 0 3em;
  }

  @media only screen and (max-width: 680px) {
    padding: 0;
    #write-dropdown,
    #discover-dropdown {
      margin: 0;
    }

    .username {
      display: none;
    }
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
          color: #222;
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
      font-size: 18px;
      padding: 0;
      margin: 0;
    }

    input {
      padding: 5px 10px;

      ::placeholder {
        color: #222;
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
          top: 4px;
          left: -4px;
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
`;

export default StyledNavbar;
