import styled from "styled-components";

const StyledStories = styled.div`
  padding: 2rem;

  .search-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    button {
      font-size: 35px;
      color: #6f6f6f;
      margin-right: 1rem;
      border: none;
    }

    .active {
      color: #000;
      border-bottom: 5px solid #ff6122;
    }
  }

  .stories-parent {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-gap: 2rem;
    h1 {
      color: #000;
      font-size: 30px;
    }
    .results {
      font-size: 15px;
    }
  }

  .filters {
    display: flex;
    flex-direction: column;
  }

  .filter {
    margin-bottom: 2rem;

    h4 {
      color: #000;
      font-size: 18px;
      font-weight: bold;
      margin-top: 30px;
    }

    .option {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;
      margin: 1rem 0;
      color: #000;

      &:hover {
        background-color: #fff6f2;
      }

      input[type="radio"] {
        appearance: none;
        border: 1px solid #000;
        border-radius: 3px;
        width: 18px;
        height: 18px;
        position: relative;
        margin-right: 8px;

        &::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ff500a;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }

        &:checked::after {
          opacity: 1;
        }

        &:hover::after {
          background-color: #ff500a;
        }
      }

      label {
        font-size: 18px;
      }
    }
  }

  .stories {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;

    .card {
      width: 700px;
      background-color: #fff;
      transition: background-color 180ms ease;
    }

    .card:hover {
      background-color: #eee;
    }
  }
`;

export default StyledStories;
