import styled from "styled-components";

const StyledLibrary = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 3rem 20px;

  h2 {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--font2);
    padding: 10px;
    font-size: 17px;
  }
  .continueReading {
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .continue-stories {
      display: flex;
    }
    .item {
      margin-right: 25px;

      .progress {
        position: relative;
        top: -5px;
        border-radius: 9px;
      }
    }
  }
`;

export default StyledLibrary;
