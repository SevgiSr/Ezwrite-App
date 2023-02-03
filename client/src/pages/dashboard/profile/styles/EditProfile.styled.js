import styled from "styled-components";

const StyledEditProfile = styled.div`
  color: #6f6f6f;

  display: flex;
  justify-content: center;
  form {
    width: 800px;
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-item {
      width: 100%;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      input,
      textarea,
      select {
        width: 100%;
        padding: 6px 15px;
        font-size: 16px;
        line-height: 24px;
        border: 1px solid #eee;
      }
      input:focus,
      textarea:focus,
      select:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
          0 0 8px rgb(102 175 233 / 60%);
      }
      label {
        margin-bottom: 5px;
        font-weight: 400;
      }
    }
  }
`;

export default StyledEditProfile;
