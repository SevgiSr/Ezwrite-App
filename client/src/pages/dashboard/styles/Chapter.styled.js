import styled from "styled-components";

const StyledChapter = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .chapter {
    width: 600px;
    h1 {
      text-align: center;
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      color: #121212;
      border-bottom: 1px solid #eee;
    }
    .content {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
    }
  }
  .comments {
    margin: 2rem 0;
  }
`;

export default StyledChapter;
