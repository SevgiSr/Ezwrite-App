import styled from "styled-components";

const StyledNavbar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;

  button {
    padding: 5px 10px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    cursor: pointer;
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
    position: relative;
    .pp {
      display: flex;
      flex-direction: row;
      align-items: center;
      .username {
        margin: 0 5px;
        font-weight: 500;
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

    .dropdown-items {
      display: flex;
      flex-direction: column;

      .dropdown-item {
        margin: 5px 0;

        span {
          margin-bottom: 0.5rem;
          position: relative;
          padding: 15px 5px;

          .nt-count {
            position: absolute;
            top: 4px;
            left: -4px;
          }
        }
      }
    }

    .dropdown-menu {
      right: 10px;
    }
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
