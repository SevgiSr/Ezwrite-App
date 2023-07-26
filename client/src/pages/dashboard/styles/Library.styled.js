import styled from "styled-components";

const StyledLibrary = styled.div`
  padding: 0 20px;

  h2 {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--font2);
    padding: 10px;
    font-size: 17px;
  }
  .continueReading {
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .continue-stories {
      display: flex;
    }
    .item {
      margin-right: 10px;

      .progress {
        position: relative;
        top: -5px;
        border-radius: 9px;
      }

      .story {
        width: 153px;
        margin-right: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: var(--background5);
        padding: 15px 30px;
        border-radius: 9px;
        box-sizing: border-box;

        .title {
          width: 100%; /* Set this to 100% so it takes up full width of parent */
          word-wrap: break-word; /* Break words at the end of the line */
          overflow-wrap: break-word; /* Same as word-wrap but more modern. Use both for maximum compatibility */
          white-space: normal; /* Ensures text can break into a new line */
          word-break: break-word;
          font-size: 15px;
          font-weight: 600;
          color: var(--font1);
          height: 35px;
          margin: 10px 0;
          text-decoration: underline transparent solid 2px;

          :hover {
            text-decoration: underline var(--text-main-orange) solid 2px;
          }
        }
        .meta-data {
          width: 100%;
          justify-content: space-between;
          color: var(--font2);
          display: flex;
          font-size: 12px;
          font-weight: 300;

          > * {
            display: flex;

            .icon {
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
`;

export default StyledLibrary;
