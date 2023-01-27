import styled from "styled-components";

const StyledProfilePicture = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
    overflow-clip-margin: content-box;
    overflow: clip;
  }
`;

export default StyledProfilePicture;
