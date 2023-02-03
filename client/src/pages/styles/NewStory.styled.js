import styled from "styled-components";

const StyledNewStory = styled.div`
  color: #6f6f6f;
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    label {
      font-size: 21px;
      font-weight: 600;
      color: #222;
      margin-bottom: 9px;
      display: inline-block;
    }
    #title,
    #desc {
      margin-bottom: 1rem;
      border: 1px solid #eee;
      padding: 10px 20px;
    }

    #title:focus,
    #desc:focus {
      border: 1px solid #222;
    }
    #category {
      padding: 0;
      margin-bottom: 1rem;
      border: none;
    }
    #category select {
      font-size: 15px;
      padding: 10px;
    }
    .create-btn {
      margin-top: 1rem;
      padding: 10px;
      width: 100px;
    }
  }
`;

export default StyledNewStory;
