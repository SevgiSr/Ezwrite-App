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
    cursor: pointer;
  }

  button > * {
    pointer-events: none;
  }

  .discover-dropdown-menu {
    display: grid;
    grid-template-columns: 100px auto;

    .dropdown-items {
      display: grid;
      grid-template-columns: repeat(4, 100px);
      column-gap: 20px;
    }
  }

  .write-dropdown-menu {
    width: 100px;
    .dropdown-items {
      display: flex;
      flex-direction: column;
    }
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
  }
`;

export default StyledNavbar;
