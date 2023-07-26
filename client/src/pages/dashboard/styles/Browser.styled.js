import styled from "styled-components";

const StyledBrowse = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5rem;
  padding: 20px;

  .list {
    min-height: 200px;
    margin-bottom: 2.3rem;
  }

  .story-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .story {
      margin: 15px 0;
    }
  }

  .explore-categories {
    .category-list {
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
    .tag-list {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .tag {
        font-size: 15px;
        width: fit-content;
        height: fit-content;
        margin: 10px;
        background-color: var(--background2);
        padding: 5px 15px;
        border-radius: 20px;
      }
    }
  }
`;

export default StyledBrowse;
