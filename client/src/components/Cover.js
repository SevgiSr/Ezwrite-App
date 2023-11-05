import styled from "styled-components";

function Cover({ width, isStatic, filename, timestamp }) {
  const numericalWidth = parseFloat(width);
  const imageUrl = `/api/images/cover/${filename}?t=${timestamp}`;

  return (
    <StyledCover
      width={width}
      numericalWidth={numericalWidth}
      isStatic={isStatic}
    >
      {filename ? (
        <img className="image item" src={imageUrl} alt="" />
      ) : (
        <div className="placeholder item"></div>
      )}
    </StyledCover>
  );
}

const StyledCover = styled.div`
  .item {
    box-shadow: 0 8px 12px rgb(8 8 8 / 18%);
    border-radius: 8px;
    width: ${(props) => props.width};
    aspect-ratio: 80 / 125;
  }
  .image {
    object-fit: cover;
  }

  .placeholder {
    background-color: var(--font2);
  }

  @media only screen and (max-width: 540px) {
    .item {
      width: ${(props) =>
        props.isStatic ? props.width : props.numericalWidth / 1.5 + "px"};
    }
  }

  @media only screen and (max-width: 720px) {
  }
`;

export default Cover;
