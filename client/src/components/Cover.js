import src from "./cover.jpg";

function Cover({ width, height }) {
  return <img style={{ width, height }} src={src} alt="" />;
}

export default Cover;
