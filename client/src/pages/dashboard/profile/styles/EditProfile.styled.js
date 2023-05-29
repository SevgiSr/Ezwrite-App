import styled from "styled-components";

const StyledEditProfile = styled.div`
  color: var(--font1);

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
        border: 1px solid transparent;
        background-color: var(--background5);
        color: var(--font1);
      }
      input:focus,
      textarea:focus,
      select:focus {
        border: 1px solid #66afe9;
      }
      label {
        margin-bottom: 5px;
        font-weight: 400;
      }
    }
  }
`;

export default StyledEditProfile;
