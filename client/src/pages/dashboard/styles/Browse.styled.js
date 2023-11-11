import styled from "styled-components";

const StyledBrowse = styled.div`
  padding: 2rem 20px;
  width: 100%;

  .browse-container {
    margin: 0 auto;
    padding: 2rem 25px;
    max-width: 900px;
    background-color: var(--background3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  header {
    max-width: 900px;
    margin: 0 auto;
    h1 {
      color: #222;
      font-weight: 600;
      margin-bottom: 1.7rem;
      color: #6f6f6f;
    }
  }

  nav {
    display: flex;
    justify-content: center;
    margin-bottom: 2.5rem;
    .nav-link {
      font-size: 21px;
      margin-right: 2.5rem;
      padding: 12px 21px;
      border-radius: 10px;
      cursor: pointer;
      :hover {
        background-color: var(--background2);
      }
    }
    .active {
      background-color: var(--background1);
    }
  }

  .list {
    min-height: 200px;
    margin-bottom: 2.3rem;
  }

  .story-list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 3rem;

    .story {
      margin: 15px 10px;
    }
  }

  .explore-categories {
    width: 100%;
    .category-list {
      margin: 0 auto;
      max-width: 600px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 20px;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;

      .column {
        display: flex;
        flex-direction: column;

        .link:hover {
          background-color: var(--background2);
        }

        > * {
          text-decoration: none;
          color: #fff;
          padding: 10px 0;
        }
        .symbol {
          font-size: 20px;
        }
      }
    }
  }

  .explore-tags {
    width: 100%;
    .tag-list {
      max-width: 600px;
      min-height: 130px;
      margin: 0 auto;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-wrap: wrap;
    }
  }
`;

export default StyledBrowse;
