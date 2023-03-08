import styled from "styled-components";

const StyledEditStoryDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  .story-manage {
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    .view-btn {
      padding: 10px 20px;
      width: 100%;
    }
    .cover {
      margin-bottom: 1rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        position: absolute;
        top: 30px;
        text-align: center;
        color: #fff;
      }
      .edit-cover-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 14px 0;
        background-color: #00b2b2;
        font-size: 16px;
        font-weight: 700;
        border: none;
        cursor: pointer;
      }
    }
  }
  .chapters-main {
    header {
      border-bottom: 1px solid #eee;
      padding: 10px 20px;
    }
    button {
      padding: 8px 20px;
      margin: 20px 10px;
    }
    .row {
      display: flex;
      padding: 10px 30px;
      .icon {
        font-size: 25px;
        margin-right: 20px;
      }
      .chapter {
        display: flex;
        flex-direction: column;
        width: 40vw;
        .title {
          width: fit-content;
          font-size: 18px;
          font-weight: 700;
          color: #000;
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #000;
          }
        }

        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .metadata {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 300px;
            > * {
              display: flex;
              .icon {
                font-size: 15px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledEditStoryDetails;
