import styled from "styled-components";

const StyledStory = styled.div`
  color: #222;
  display: flex;
  flex-direction: row;

  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .content {
    margin-left: 10px;
    word-wrap: break-word;

    h3 {
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
    }

    .meta-data {
      color: #6f6f6f;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 12px;

      div {
        margin-right: 7px;
      }
    }

    .description {
      color: #6f6f6f;
      font-size: 15px;
      line-height: 21px;
    }
  }
`;

export default StyledStory;
