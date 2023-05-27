import styled from "styled-components";

const StyledAbout = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;

  .info {
    font-size: 15px;
    color: #222;
    width: 28%;
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
  .work-info {
    width: 68%;
    .stories {
      padding: 1rem;

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
      .show-more {
        width: 100%;
        background-color: #eee;
        color: #6f6f6f;
        text-align: center;
        border: none;
        font-size: 16px;
        padding: 0.6rem 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          margin-left: 10px;
        }
        :hover {
          color: #6f6f6f;
        }
      }
    }

    .readingLists {
      margin-top: 1rem;
    }
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .info {
      min-width: 100%;
      margin-bottom: 1rem;
    }
    .work-info {
      min-width: 100%;
    }
  }
  @media only screen and (min-width: 768px) {
    width: 740px;
  }
  @media only screen and (min-width: 992px) {
    width: 960px;
  }
  @media only screen and (min-width: 1350px) {
    width: 1160px;
  }
`;

export default StyledAbout;
