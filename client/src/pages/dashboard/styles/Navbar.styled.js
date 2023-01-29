import styled from "styled-components";

const StyledNavbar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: white;

  button {
    padding: 5px 10px;
    font-size: 15px;
    font-weight: 500;

    border: none;
  }

  .dropdown-menu-parent {
    display: none;
  }

  .dropdown-menu {
    position: absolute;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }

  .dropdown-item {
    text-decoration: none;
    color: #222;
  }

  .show {
    display: block;
  }

  #discover {
    width: 20%;
    ul {
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      list-style-type: none;
    }
  }

  .search-form {
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      border: none;
      font-size: 18px;
      padding: 0;
    }

    input {
      padding: 5px 10px;
      ::placeholder {
        color: black;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .search-form input {
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

  .profile-dropdown {
    button {
      border: none;
      padding-right: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    button > * {
      pointer-events: none;
    }
  }
`;

export default StyledNavbar;
