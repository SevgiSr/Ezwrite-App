import styled from "styled-components";

const StyledProfilePicture = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.width};

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
    object-fit: cover;
  }
`;

export default StyledProfilePicture;
