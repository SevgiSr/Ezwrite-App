import styled from "styled-components";

const StyledDropdownMenu = styled.div`
  .dropdown-menu-parent {
    opacity: 0;
    position: relative;
    z-index: 1;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  }

  .dropdown-menu {
    position: absolute;
    background-color: white;
    padding: 12px 3px;
    border: transparent;
    border-radius: 0.25rem;
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.3);
  }

  .dropdown-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dropdown-item {
    text-decoration: none;
    color: #222;
    font-size: 16px;
    padding: 10px 5px;
  }

  .show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export default StyledDropdownMenu;
