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
  }

  .filters {
    display: flex;
    flex-direction: column;
  }

  .filter {
    margin-bottom: 2rem;

    h4 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .option {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }

      input[type="radio"] {
        appearance: none;
        border: 1px solid #ccc;
        border-radius: 0;

        width: 16px;
        height: 16px;
        position: relative;
        margin-right: 8px;

        &::before {
          content: "";
          position: absolute;
          top: -1px;
          left: -1px;
          width: 18px;
          height: 18px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        &::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ccc;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }

        &:checked::after {
          opacity: 1;
        }

        &:hover::before {
          border-color: #888;
        }

        &:hover::after {
          background-color: #888;
        }
      }

      label {
        font-size: 1rem;
      }
    }
  }

  .stories {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`;

export default StyledStories;
