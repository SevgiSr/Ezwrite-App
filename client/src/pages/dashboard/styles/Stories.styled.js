import styled from "styled-components";

const StyledStories = styled.div`
  padding: 2rem;
  color: var(--font1);

  .search-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    button {
      font-size: 35px;
      color: var(--font2);
      margin-right: 1rem;
      border: none;
      cursor: pointer;
    }

    .active {
      color: var(--font1);
      border-bottom: 5px solid #ff6122;
    }
  }

  .stories-parent {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-gap: 2rem;
    h1 {
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

      &:hover {
        background-color: var(--background5);
      }

      input[type="radio"] {
        appearance: none;
        border: 1px solid var(--font2);
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
      background-color: var(--background5);
      transition: background-color 180ms ease;
    }
  }
`;

export default StyledStories;
