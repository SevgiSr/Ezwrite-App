import styled from "styled-components";

const StyledProfileNavbar = styled.div`
  height: 50px;
  border-bottom: 2px solid #eee;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .navbar-overlay {
    background-color: #fff;
    opacity: 0.75;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .edit-profile-btn {
    cursor: pointer;
    height: 40px;
    padding: 5px 10px;
    margin: 0 2rem;
    color: #6f6f6f;
    font-size: 16px;
    border: solid 2px #eee;
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      color: #6f6f6f;
    }
    .icon {
      margin-right: 5px;
    }
  }
`;

export default StyledProfileNavbar;
