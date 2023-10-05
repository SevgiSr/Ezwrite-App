import styled from "styled-components";

const StyledReadingList = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 3rem 20px;

  header {
    margin-bottom: 1.7rem;
    h1 {
      font-size: 32px;
    }
    h2 {
      margin-bottom: 1rem;
      font-weight: 300;
      color: var(--font2);
    }
  }

  .main {
    display: flex;
    .item {
      margin-right: 15px;
    }
  }
`;

export default StyledReadingList;
