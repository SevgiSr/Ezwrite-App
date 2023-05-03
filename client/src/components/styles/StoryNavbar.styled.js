import styled from "styled-components";

const StyledStoryNavbar = styled.div`
  .navbarContainer {
    position: fixed;
    width: 100vw;
    height: 100px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.5rem;
    }
  }

  #storyPreview {
    margin-left: 5rem;
  }

  #titlePreview {
    font-size: 14px;
    margin: 0;
  }

  #chapterPreview {
    font-size: 21px;
    margin: 0;
  }

  #updatePreview {
    font-size: 14px;
    margin: 0;
  }
`;

export default StyledStoryNavbar;
