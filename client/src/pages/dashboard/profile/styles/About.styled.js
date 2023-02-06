import styled from "styled-components";

const StyledAbout = styled.div`
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .info {
      min-width: 100%;
      margin-bottom: 1rem;
    }
    .stories {
      min-width: 100%;
    }
  }

  .info {
    font-size: 15px;
    color: #222;
    width: 25%;
    padding: 1rem;
    height: fit-content;
    box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%), 0 4px 5px 0 rgb(34 34 34 / 10%);
    .location {
      margin: 1rem 0;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      .icon {
        margin-right: 10px;
      }
    }
  }
  .stories {
    width: 65%;
    padding: 1rem;
    box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%), 0 4px 5px 0 rgb(34 34 34 / 10%);
    .stories-header {
      margin-bottom: 1.5rem;
      h3 {
        font-size: 24px;
        font-weight: 600;
        color: #222;
        display: flex;
        justify-content: space-between;
        .edit-icon {
          cursor: pointer;
          font-size: 30px;
          display: flex;
          align-items: center;
        }
      }
      .meta-data {
        display: inline-block;
        margin-top: 5px;
        font-size: 15px;
        color: #6f6f6f;
        span {
          margin-right: 10px;
        }
      }
    }
  }
`;

export default StyledAbout;
