import styled from "styled-components";

const StyledLibrary = styled.div`
  padding: 1rem 3rem;
  header {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--font2);
  }
  .continueReading {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .item {
      margin-right: 10px;

      .progress {
        position: relative;
        top: -5px;
        border-radius: 9px;
      }

      .story {
        width: 123px;
        margin-right: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: var(--background5);
        padding: 15px 30px;
        border-radius: 9px;

        .title {
          display: block;
          font-size: 15px;
          line-height: 18px;
          font-weight: 600;
          color: var(--font1);
          height: 35px;
          overflow: hidden;
          margin-top: 10px;
          text-decoration: underline transparent solid 2px;

          :hover {
            text-decoration: underline var(--text-main-orange) solid 2px;
          }
        }
        .meta-data {
          width: 88%;
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
