import styled from "styled-components";

const StyledHome = styled.div`
  .stories-row {
    margin: 3rem 0;
    h1 {
      padding-left: 2rem;
      color: #000;
    }
  }
  .row {
    position: relative;
  }

  .row--left,
  .row--right {
    position: absolute;
    z-index: 999;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
    transition: background-color ease-in-out 0.3s;
  }

  .row--left:hover,
  .row--right:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .row--left {
    left: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .row--right {
    right: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .row--list {
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 1rem;
  }

  .row--list-wrapper {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    transition: margin-left ease-in-out 0.5s;
  }

  .row--item {
    margin-right: 1rem;
    transition: transform ease-in-out 0.2s;
  }

  .row--item:last-of-type {
    margin-right: 0;
  }

  .row--item:hover {
    transform: scale(1.08);
  }
`;

export default StyledHome;
